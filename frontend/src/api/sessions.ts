import { api } from "./client";

export async function getSession(id: string) {
    return api(`/sessions/${id}`);
}

