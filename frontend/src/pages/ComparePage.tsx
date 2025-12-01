import { useState } from "react";
import { compareSessions } from "../api/compare";
import styles from "./ComparePage.module.css";

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
                <pre className={styles.resultBox}>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        
        </div>
    )}
