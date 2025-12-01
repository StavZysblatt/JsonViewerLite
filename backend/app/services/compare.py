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

    meta_diferences = {}

    for key in md1.keys():
        if key in md2 and md1[key] != md2[key]:
            meta_diferences[key] = f"{md1[key]} vs {md2[key]}"
        
    diff["metadataDiff"] = meta_diferences

    return diff