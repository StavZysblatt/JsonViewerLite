import { api } from "./client";
import type { UploadResponse } from "../types/session";

export async function uploadSession(file: File){
    const formData = new FormData();
    formData.append("file", file);

    return api<UploadResponse> ("/upload", {
        method: "POST",
        body: formData,
    });

}
