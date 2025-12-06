import { api } from "./client";
import type { CompareResponse } from "../types/session";

export async function compareSessions(id1: string, id2: string) {
   return api<CompareResponse>("/compare",{
    method:"POST",
    body: JSON.stringify({
        sessionIds: [id1, id2],
    }),
   });
}