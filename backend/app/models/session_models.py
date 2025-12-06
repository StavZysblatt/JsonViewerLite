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


class UploadResponseModel(BaseModel):
    parsed: ParsedSessionModel
    summary: SummaryModel
    id: str

class CompareRequestModel(BaseModel):
    sessionIds: List[str]

class CompareSessionModel(BaseModel):
    id: str
    parsed: ParsedSessionModel
    summary: SummaryModel

class EventDiffModel(BaseModel):
    sharedCategories: List[str]
    missingFromS1: List[str]
    missingFromS2: List[str]
    categoryDiffs: Dict[str, Dict[str, int]]

class MetadataDiffModel(BaseModel):
    differences: Dict[str, str]

class CompareResponseModel(BaseModel):
    sessions: List[CompareSessionModel]
    diff: Dict[str, Any]




