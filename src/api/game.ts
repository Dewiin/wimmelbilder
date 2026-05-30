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
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>,
    setGameCompleted: Dispatch<SetStateAction<boolean>>
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
        setGameCompleted(result.completed);
    }
}

export async function startGameSession(
    mapName: string,
    setGameSession: Dispatch<SetStateAction<TSession|undefined>>,
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>,
) {
    const result = await api('/api/game/session/start', {
        method: "POST"
    }, setSonner);

    if(result) {
        setGameSession(result.gameSession);

        localStorage.setItem(
            `gameSession-${mapName}`,
            JSON.stringify(result.gameSession)
        );
    };
}

export async function endGameSession(
    sessionId: string,
    mapName: string,
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>,
    setGameSession?: Dispatch<SetStateAction<TSession|undefined>>,
) {
    const result = await api(`/api/game/session/${sessionId}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }, setSonner);

    if(result) {
        if(setGameSession) setGameSession(result.updatedSession);

        localStorage.removeItem(`gameSession-${mapName}`);
    }
}

export async function getGameSession(
    sessionId: string,
    setCharacters: Dispatch<SetStateAction<TCharacter[]>>
) {
    const result = await api(`/api/game/session/${sessionId}`, {
        method: "GET",
    });

    if(result) {
        setCharacters((prev) => (
            prev.filter((character) => 
                !result.gameSession.found.some((found: any) => character.id === found.characterId)
        )));
    }
}

export async function submitName(
    data: {
        sessionId: string,
        username: string, 
    },
    mapName: string,
    setSonner: Dispatch<SetStateAction<TSonner|undefined>>
) {
    const result = await api(`/api/game/${mapName}/score`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }, setSonner);

    return result;
}
