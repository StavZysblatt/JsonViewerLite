import { api } from "./client";
import type { UploadResponse } from "../types/session";

export async function getSession(id: string) {
    return api<UploadResponse>(`/sessions/${id}`);
}

