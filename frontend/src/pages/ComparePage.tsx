import { useState } from "react";
import { compareSessions } from "../api/compare";
import styles from "./ComparePage.module.css";
import SessionView from "../components/SessionView";

export default function ComparePage() {
    const [id1, setId1] = useState("");
    const [id2, setId2] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    async function handleCompare(){
        setError("");

        if (!id1 || !id2) {
            setError("Please enter both session IDs");
            return;
        } 

        try {
            const response = await compareSessions(id1, id2);
            setResult(response);
        } catch (err: any) {
            setError(err.message);
        }
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Compare Sessions</h2>

            <input placeholder="Session ID 1"
            value={id1}
            onChange={(e) => setId1(e.target.value)}
            className={styles.input}
            />

            <input
            placeholder="Session ID 2"
            value={id2}
            onChange={(e) => setId2(e.target.value)}
            className={styles.input}
            />
            
            <button className={styles.button} onClick={handleCompare}>Compare</button>

            {error && <p className={styles.error}>{error}</p>}

            {result && (
                <div className={styles.compareGrid}>
                    <div>
                     <h3>Session A</h3>
                     <SessionView data={result.sessions[0]}/>
                    </div>

                    <div>
                     <h3>Session B</h3>
                      <SessionView data={result.sessions[1]} />
                    </div>

                    <div className={styles.card}>
                    <h4>Metadata Differences</h4>
                    {Object.entries(result.diff.metadataDiff).length === 0 && (
                        <p>No metadata Differences</p>
                    )}
                    {Object.entries(result.diff.metadataDiff).map(([key, value]: [string, any]) => (
                        <p key={key}>
                            {key}: <strong>{value}</strong>
                        </p>
                    ))}
                </div>

                <div className={styles.card}>
                    <h4>Event Differences</h4>

                    <p><strong>Shared Categories:</strong> {result.diff.events.sharedCategories.join(", ")}</p>
                    <p><strong>Missing From Session 1:</strong> {result.diff.events.missingFromS1.join(", ")}</p>
                    <p><strong>Missing From Session 2:</strong> {result.diff.events.missingFromS2.join(", ")}</p>

                    <h4>Category Counts</h4>
                    {Object.entries(result.diff.events.categoryDiffs).map(([category, values]: any)=>(
                        <p key={category}>
                            {category}: S1 = {values.s1}, S2 = {values.s2}
                        </p>
                    ))}
                </div>
                
                </div> 
                
                
            )}
        </div>
    )}
