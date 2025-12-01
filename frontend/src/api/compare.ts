import { api } from "./client";

export async function compareSessions(id1: string, id2: string) {
   return api("/compare",{
    method:"POST",
    body: JSON.stringify({
        sessionIds: [id1, id2],
    }),
   });
}