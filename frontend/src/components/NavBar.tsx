import {Link} from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar(){
    return (
        <nav className={styles.nav}>
            <Link to="/upload" className={styles.link}>Upload</Link>
            <Link to="/compare" className={styles.link}>Compare</Link>
            <Link to="/review" className={styles.link}>Review</Link>
        </nav>
    );
}