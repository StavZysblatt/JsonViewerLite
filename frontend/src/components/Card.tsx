import styles from "./Card.module.css";

export default function Card({ title, children }: any) { //Passing a title and children (What ever i put inside the component)
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
