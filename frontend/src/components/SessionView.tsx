import styles from "./SessionView.module.css";
import type { ParsedSession, Summary, UploadResponse, CompareSession, Eventitem } from "../types/session";

type SessionViewProps = {
  data: UploadResponse | CompareSession; //Declaring the props type we will recieve
};                                      //data can be either an upload or a compare

export default function SessionView({data}: SessionViewProps) {

    const session: ParsedSession = data.parsed;
    const summary: Summary = data.summary;

    const eventCounts = summary.eventCounts || {};
    const metadata = session.metadata?.data || {};
    const events = session.events?.categories || {};

    function formatItem(item: any) {
        return Object.entries(item).map(([k, v]: [string, any]) => {
            if (k === "t") {
              const date = new Date(v * 1000);
              return `time: ${date.toLocaleTimeString()}`;
            }
            return `${k}: ${v}`;
          })
          .join(", ");
      }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h2>Session ID: {session.sessionId}</h2>
                <p>User ID: {session.userId}</p>
            </div>

            <div className={styles.section}>
                <h3>Summary</h3>
                <div className={styles.card}>
                {Object.keys(eventCounts).map((key) =>( //create a list of categories and loop through the list to render each cat
                    <p key={key}>
                        {key}: <strong>{eventCounts[key]}</strong>
                    </p>
                ))}
            </div>
        </div>

        <div className={styles.section}>
            <h3>Metadata</h3>
            <div className={styles.card}>
                {Object.keys(metadata).length === 0 && <p>No metadata available</p>}

                {Object.entries(metadata).map(([key, value]) => (
                    <p key={key}>
                        {key}: <strong>{String(value)}</strong>
                    </p>
                ))}
            </div>
        </div>

        <div className={styles.section}>
            <h3>Events</h3>
            <div className={styles.card}>
            {Object.entries(events).map(([key, items]: any) => { //Converts events to an array of [key,value] pairs so we can iterate over it
                                                                //We iterate over the key (event name) and the value (array of actual events)
                if (!Array.isArray(items)) return null;        //The value can hold multiple arrays that each of them represets the actual event data

                return (
                    <div key={key} className={styles.eventCategory}>
                        <p className={styles.eventCategoryTitle}>{key}</p>

                        {items.map((item: Eventitem, index: number) => ( //Iterate over each item array, Index represents the event array location inside the item array
                            <p key={index} className={styles.eventItem}>
                                <strong>{formatItem(item)}</strong>
                            </p>
                        ))}
                    </div>
                );
            })}
          </div>
         </div>
        </div>       
    );
}