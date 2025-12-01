import { useState } from "react";
import styles from "./Tabs.module.css";

export default function Tabs({ tabs }: any) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab: any, index: number) => (
          <button
            key={index}
            className={active === index ? styles.active : styles.tab}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>{tabs[active].content}</div>
    </div>
  );
}
