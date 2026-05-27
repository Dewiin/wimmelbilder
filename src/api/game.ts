import { api } from "./client";
import type { Dispatch, SetStateAction } from "react";
import type { TCharacter } from "@/types/TCharacter";
import type { TSonner } from "@/types/TSonner";
import type { TSession } from "@/types/TSession";

export async function postSubmission(
    data: {
        clientCharacter: TCharacter,
        sessionId: string,
        xCoord: number,
        yCoord: number,
    },
    mapName: string,
    setCharacters: Dispatch<SetStateAction<TCharacter[]>>,
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>
) {
    const result = await api(`/api/game/${mapName}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }, setSonner);

    if(result && result.status === "success") {
        setCharacters((prev) => (
            prev.filter((character) => character.id !== data.clientCharacter.id)
        ));
    }
}

export async function startGameSession(
    setGameSession: Dispatch<SetStateAction<TSession|undefined>>,
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>,
) {
    const result = await api('/api/game/start', {
        method: "POST"
    }, setSonner);

    if(result) setGameSession(result.gameSession);
}

export async function endGameSession() {

}