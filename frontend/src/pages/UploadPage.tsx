import { useState } from "react";
import { uploadSession } from "../api/upload";
import styles from "./UploadPage.module.css";
import SessionView from "../components/SessionView";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);   // store the real file
  }

  async function handleUpload() {
    setError("");

    if (!file) {
      setError("No file selected");
      return;
    }

    try {
      const response = await uploadSession(file); //Sends the file to the upload.ts tile
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>Upload JSON Session</h2>

    <div className={styles.uploadSection}>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>

    {error && <p className={styles.error}>{error}</p>}

    {result && <SessionView data={result} />}
    
  </div>
  );
}
