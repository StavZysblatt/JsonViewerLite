import { useState } from "react";
import { uploadSession } from "../api/upload";
import styles from "./UploadPage.module.css";
import SessionView from "../components/SessionView";
import type { UploadResponse } from "../types/session";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]; //HTML allows selecting multiple files, We want to access the first one.
    if (!selectedFile) return;

    setFile(selectedFile);   // store the real file
  }

  async function handleUpload() {
    setError("");
    setResult(null);
    
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
      <input type="file" accept=".json" onChange={handleFileChange} /> //Show a file picker and filter out all files who are not json (allow only json)
      <button onClick={handleUpload}>Upload</button>
    </div>

    {error && <p className={styles.error}>{error}</p>}

    {result && <SessionView data={result} />}
    
  </div>
  );
}
