from app.db.mongo import get_sessions_collection
from app.models.session_models import ParsedSessionModel, SummaryModel
from bson import ObjectId

async def save_session(parsed: ParsedSessionModel, summary: SummaryModel):
    collection = get_sessions_collection()

    existing = await collection.find_one({
        "parsed.sessionId": parsed.sessionId,
        "parsed.userId": parsed.userId
    })

    if existing:
        raise ValueError("Session already exists")

    document = {
        "parsed": parsed.model_dump(),
        "summary": summary.model_dump()
    }

    result = await collection.insert_one(document)

    return str(result.inserted_id)

async def get_session_by_id(session_id: str):
    collection = get_sessions_collection()

    # First try: match on parsed.sessionId (sessionId user sees)
    doc = await collection.find_one({"parsed.sessionId": session_id})
    if doc:
        return doc

    # Second: also allow searching by Mongo ObjectId
    try:
        oid = ObjectId(session_id)
        doc = await collection.find_one({"_id": oid})
        return doc
    except:
        return None

async def list_sessions():
    collection = get_sessions_collection()

    cursor = collection.find({})
    return [
        { **doc, "_id": str(doc["_id"]) }
        for doc in await cursor.to_list(length=1000)
    ]