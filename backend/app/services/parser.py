from fastapi import HTTPException
from app.models.session_models import ParsedSessionModel, SessionMetadataModel, EventsModel, SummaryModel


def parse_session(data):
    session_id = data.get('sessionId')
    user_id = data.get('userId')
    

    if not session_id or not user_id:
        raise ValueError("Missing required fields: sessionId or userId")


    metadata = data.get('metadata')
    if not isinstance(metadata, dict):
        metadata = {}
    

    events = data.get("events", {}) #if events dont exist, return empty dictionary

    if not isinstance(events, dict):
        raise HTTPException(400, "events must be an object")


    parsed_events = {}

    
    for category, items in events.items(): #for each category, add the items to the parsed_events dictionary
        parsed_events[category] = items
    

    return ParsedSessionModel(
        sessionId=session_id,
        userId=user_id,
        metadata=SessionMetadataModel(data=metadata),
        events=EventsModel(categories=parsed_events)
    )

def build_summary(parsed_session):
    events = parsed_session.events.categories
    event_counts = {category: len(items) for category, items in events.items()}
    total = sum(event_counts.values())

    return SummaryModel(
        totalEvents=total,
        eventCounts=event_counts,
        availableCategories=list(event_counts.keys())
    )