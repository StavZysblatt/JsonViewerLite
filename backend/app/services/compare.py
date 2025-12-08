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
    missingFromS2 = list(categories1 - categories2)

    all_categories = categories1.union(categories2)

    categoryDiffs = {                                     #category is the outer dict key that holds a dictionary value (s1 / s2)
        category: {                                       #s1/s2 are inner dict keys that hold the eventcount of a category as a value
            "s1": summary1.eventCounts.get(category, 0),  #For each category, create a dict showing how many events appeared in session 1 and 2
            "s2": summary2.eventCounts.get(category, 0)
        }
        for category in all_categories
    }

    diff["events"] = {
        "sharedCategories": shared,
        "missingFromS1": missingFromS1,
        "missingFromS2": missingFromS2,
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
            meta_diferences[key] = f"{v1} vs {v2}" #If the keys do not match then we can compare them, Else, skip
        
    diff["metadataDiff"] = meta_diferences

    return diff