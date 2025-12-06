from app.models.session_models import ParsedSessionModel, SummaryModel

def compare_logic(parsed1: ParsedSessionModel, summary1: SummaryModel, parsed2: ParsedSessionModel, summary2: SummaryModel):

    diff = {
        "events": {},
        "metadataDiff": {}
    }

    categories1 = set(summary1.eventCounts.keys())
    categories2 = set(summary2.eventCounts.keys())

    shared = list(categories1 & categories2)
    missingFromS1 = list(categories2 - categories1)
    missingfromS2 = list(categories1 - categories2)

    all_categories = categories1.union(categories2)

    categoryDiffs = {
        category: {
            "s1": summary1.eventCounts.get(category, 0),
            "s2": summary2.eventCounts.get(category, 0)
        }
        for category in all_categories
    }

    diff["events"] = {
        "sharedCategories": shared,
        "missingFromS1": missingFromS1,
        "missingFromS2": missingfromS2,
        "categoryDiffs": categoryDiffs
    }

    md1 = parsed1.metadata.data
    md2 = parsed2.metadata.data

    all_keys = set((md1.keys()) | set(md2.keys()))  #Unioning all keys for comparison

    meta_diferences = {}

    for key in all_keys:
        v1 = md1.get(key)
        v2 = md2.get(key)

        if v1 != v2:
            meta_diferences[key] = f"{v1} vs {v2}"
        
    diff["metadataDiff"] = meta_diferences

    return diff