import styles from "./SessionView.module.css";

export default function SessionView({data}: any) {

    const session = data.parsed;
    const summary = data.summary;

    const eventCounts = summary.eventCounts || {};
    const metadata = session.metadata?.data || {};
    const events = session.events?.categories || data.events || {};

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
                {Object.keys(eventCounts).map((key) =>(
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
            {Object.entries(events).map(([key, items]: any) => {

                if (key === "categories") return null;

                if (!Array.isArray(items)) return null;

                return (
                    <div key={key} className={styles.eventCategory}>
                        <p className={styles.eventCategoryTitle}>{key}</p>

                        {items.map((item: any, index: number) => (
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