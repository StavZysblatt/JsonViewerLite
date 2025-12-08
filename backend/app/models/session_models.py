from pydantic import BaseModel
from typing import Any, Dict, List

class SessionMetadataModel(BaseModel):
    data: Dict[str, Any]

class EventsModel(BaseModel):
    categories: Dict[str, List[Any]]

class ParsedSessionModel(BaseModel):
    sessionId: str
    userId: str
    metadata: SessionMetadataModel
    events: EventsModel

class SummaryModel(BaseModel):
    totalEvents: int
    eventCounts: Dict[str, int]
    availableCategories: List[str]


class CompareRequestModel(BaseModel):
    sessionIds: List[str]

class SessionDataModel(BaseModel):
    id: str
    parsed: ParsedSessionModel
    summary: SummaryModel


class CompareResponseModel(BaseModel):
    sessions: List[SessionDataModel]
    diff: Dict[str, Any]




