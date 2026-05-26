import type { TSonner } from "@/types/TSonner";
import type { SetStateAction } from "react";
import type React from "react";

export const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
    setSonner?: React.Dispatch<SetStateAction<TSonner|undefined>>
) {
    const response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
    });
    const result = await response.json();

    if(!response.ok) {
        if(setSonner && result.error) setSonner({ variant: "error", title: result.error })
        return null;
    }
    
    if(setSonner) {
        setSonner({ variant: result.status, title: result.message });
    }
    return result;
}