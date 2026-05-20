import { api } from "./client";

export async function getMaps(
    setMaps: Function
) {
    const result = await api("/api/game", {
        method: "GET",
    });

    if(result) setMaps(result.maps)
}