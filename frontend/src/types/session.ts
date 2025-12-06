export interface SessionMetadata {
    [key: string]: any;
}

export interface Eventitem {
    [key: string]: any;
}

export interface EventCategories {
    [key: string]: Eventitem[];
}

export interface ParsedSession {
    sessionId: string;
    userId: string;
    metadata: {
        data: SessionMetadata;
    };
    events: {
        categories: EventCategories;
    };
}

export interface Summary {
    totalEvents: number;
    eventCounts: { [category: string]: number};
    availableCategories: string[];
}

export interface UploadResponse { 
    id?: string
    parsed: ParsedSession;
    summary: Summary;
}

export interface CompareSession {
    id: string;
    parsed: ParsedSession;
    summary: Summary;
}

export interface CompareDiff {
    events: {
        sharedCategories: string[];
        missingFromS1: string[];
        missingFromS2: string[];
        categoryDiffs: {
            [category: string]: {s1: number; s2: number };
        };
    };
    metadataDiff: {
        [key: string]: string;
    };
}

export interface CompareResponse {
    sessions: CompareSession[];
    diff: CompareDiff;
}