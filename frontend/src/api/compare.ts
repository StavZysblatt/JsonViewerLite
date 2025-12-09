import { api } from "./client";
import type { CompareResponse } from "../types/session";

export async function compareSessions(id1: string, id2: string) {
   return api<CompareResponse>("/compare",{
    method:"POST", //Sending data, no a ready-only operation
    body: JSON.stringify({ //Can not send JS objects via HTTP & backend expects JSON
        sessionIds: [id1, id2],
    }),
   });
}