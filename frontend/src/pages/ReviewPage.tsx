import { useState } from "react";
import { getSession } from "../api/sessions";
import SessionView from "../components/SessionView";
import styles from "./ReviewPage.module.css"

export default function ReviewPage(){
    const [sessionId, setSessionId] = useState("");
    const [session, setSession] = useState<any>(null);
    const [error, setError] = useState("");


    async function handleLoad(){
        setError("");
        setSession(null);

        if (!sessionId){
            setError("Please enter a session ID");
            return;
        }

        try{
            const result = await getSession(sessionId);
            setSession(result)
        } catch (err: any){
            setError(err.message);
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Review Session</h2>

            <input
                placeholder="Enter session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className={styles.input}
            />

            <button onClick={handleLoad} className={styles.button}>Load Session</button>

            {error && <p className={styles.error}>{error}</p>}

            {session && <SessionView data={session} />}
        </div>
    );

}