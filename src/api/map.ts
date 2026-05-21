import { api } from "./client";

export async function getMaps(
    setMaps: Function
) {
    const result = await api("/api/game", {
        method: "GET",
    });

    if(result) setMaps(result.maps)
}

export async function getMapByName(
    mapName: string,
    setMap: Function,
) {
    const result = await api(`/api/game/${mapName}`, {
        method: "GET"
    });

    if(result) setMap(result.map)
}