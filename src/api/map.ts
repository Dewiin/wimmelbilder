import type React from "react";
import { api } from "./client";

// types
import type { SetStateAction } from "react";
import type { TMap } from "@/types/TMap";
import type { TCharacter } from "@/types/TCharacter";

export async function getMaps(
    setMaps: React.Dispatch<SetStateAction<TMap[]>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
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
    setMap: React.Dispatch<SetStateAction<TMap|undefined>>,
    setCharacters: React.Dispatch<SetStateAction<TCharacter[]>>,
) {
    const result = await api(`/api/game/${mapName}`, {
        method: "GET"
    });

    if(result) {
        setMap(result.map);
        setCharacters(result.characters);
    }
}