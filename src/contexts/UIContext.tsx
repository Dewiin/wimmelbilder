import type { TSonner } from "@/types/TSonner";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UIContextProps = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    sonner: TSonner|undefined,
    setSonner: React.Dispatch<React.SetStateAction<TSonner|undefined>>
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {},
    sonner: undefined,
    setSonner: () => {}
});

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ sonner, setSonner ] = useState<TSonner|undefined>();

    useEffect(() => {
        if(!sonner) return;
        
        if(sonner.variant === "success") toast.success(sonner.title, { description: sonner.description });
        if(sonner.variant === "error") toast.error(sonner.title, { description: sonner.description });
    }, [sonner]);

    const values = {
        isLoading, 
        setIsLoading,
        sonner,
        setSonner
    }

    return (
        <UIContext value = {values}>
            { children }
        </UIContext>
    )
}

export function useUI() {
    return useContext(UIContext);
}