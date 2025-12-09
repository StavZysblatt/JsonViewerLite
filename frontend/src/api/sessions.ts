import { api } from "./client";
import type { UploadResponse } from "../types/session";

export async function getSession(id: string) {
    return api<UploadResponse>(`/sessions/${id}`); //When the request in complete, the response will look like "UploadResponse"
}

