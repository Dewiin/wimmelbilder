import { api } from "./client";
import type { Dispatch, SetStateAction } from "react";
import type { TCharacter } from "@/types/TCharacter";
import type { TSonner } from "@/types/TSonner";

export async function postSubmission(
    data: {
        xCoord: number,
        yCoord: number,
        clientCharacter: TCharacter
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