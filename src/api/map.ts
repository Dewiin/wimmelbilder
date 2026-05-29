import type { Dispatch, SetStateAction } from "react";
import { api } from "./client";

// types
import type { TCharacter } from "@/types/TCharacter";
import type { TScore } from "@/types/TScore";
import type { TMap } from "@/types/TMap";

export async function getMaps(
    setMaps: Dispatch<SetStateAction<TMap[]>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
) {
    setIsLoading(true);
    try {
        const result = await api("/api/game", {
            method: "GET",
        });
        
        if(result) setMaps(result.maps)
    } finally {
        setIsLoading(false);
    }
}

export async function getMapAndCharacters(
    mapName: string,
    setMap: Dispatch<SetStateAction<TMap|undefined>>,
    setCharacters: Dispatch<SetStateAction<TCharacter[]>>,
) {
    const result = await api(`/api/game/${mapName}`, {
        method: "GET"
    });

    if(result) {
        setMap(result.map);
        setCharacters(result.characters);
    }
}

export async function getLeaderboard(
    mapName: string,
    setLeaderboard: Dispatch<SetStateAction<TScore[]>>,
) {
    const result = await api(`/api/game/${mapName}/leaderboard`, {
        method: "GET"
    });

    if(result) setLeaderboard(result.leaderboard)
}