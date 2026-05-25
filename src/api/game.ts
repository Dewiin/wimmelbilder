import { api } from "./client";
import type { TCharacter } from "@/types/TCharacter";

export async function postSubmission(
    data: {
        xCoord: number,
        yCoord: number,
        clientCharacter: TCharacter
    },
    mapName: string
) {
    await api(`/api/game/${mapName}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });
}