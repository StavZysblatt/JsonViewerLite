from fastapi import APIRouter, UploadFile, File, HTTPException
import json
from app.services.parser import parse_session, build_summary
from app.models.session_models import (
    ParsedSessionModel,
    SessionDataModel,
    SummaryModel,
    CompareRequestModel,
    CompareResponseModel
)
from app.crud.session_crud import save_session, get_session_by_id
from app.services.compare import compare_logic
from app.services.rabbitmq_client import publish_session_uploaded

router = APIRouter()

@router.post('/upload', response_model=SessionDataModel)
async def upload_session(file: UploadFile = File(...)): 
    content = await file.read()
    try:
        data = json.loads(content)
        parsed = parse_session(data)
        summary = build_summary(parsed)
        session_id = await save_session(parsed, summary)
        await publish_session_uploaded(str(session_id))

        return SessionDataModel(
            id=session_id,
            parsed=parsed,
            summary=summary
         )
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/structure')
def get_structure(): #Not async because it's a simple endpoint that returns a static structure
    
    return {
        "sessionId": "example-session-id",
        "userId": "example-user-id",
        "metadata": {
            "exampleKey": "exampleValue",
            "device": "iPhone",
            "ip": "127.0.0.1"
        },
        "events": {
            "mouseEvents": [
                {"x": 100, "y": 200, "t": 1234567890}
            ],
            "tapEvents": [
                {"x": 50, "y": 80, "t": 1234567895}
            ],
            "apiCalls": [
                {"endpoint": "/login", "status": 200, "t": 1234567900}
            ]
        }
    }

@router.post('/compare', response_model=CompareResponseModel)
async def compare_sessions(request: CompareRequestModel):   

    ids = request.sessionIds

    if len(ids) != 2:
        raise HTTPException(status_code=400, detail="Exactly 2 sessionIds required")
    
    s1 = await get_session_by_id(ids[0])
    s2 = await get_session_by_id(ids[1])

    if not s1 or not s2:
        raise HTTPException(status_code=404, detail="One or both sessions not found")
    
    parsed1 = ParsedSessionModel(**s1["parsed"]) #Unpacking the session dict to send each dict key as a named argument (For my model)
    summary1 = SummaryModel(**s1["summary"])

    parsed2 = ParsedSessionModel(**s2["parsed"])
    summary2 = SummaryModel(**s2["summary"])

    diff = compare_logic(parsed1, summary1, parsed2, summary2)

    return CompareResponseModel(
        sessions = [
            SessionDataModel(id=str(s1["_id"]), parsed=parsed1, summary=summary1),
            SessionDataModel(id=str(s2["_id"]), parsed=parsed2, summary=summary2)
        ],
        diff=diff
    )    

@router.get("/sessions/{session_id}", response_model=SessionDataModel)
async def get_session(session_id: str):
    doc = await get_session_by_id(session_id)

    if not doc:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return SessionDataModel(
        id=str(doc["_id"]),
        parsed=ParsedSessionModel(**doc["parsed"]),
        summary=SummaryModel(**doc["summary"])
    )
