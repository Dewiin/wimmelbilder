import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// types
import type { Dispatch, ReactNode } from "react";
import type { TSonner } from "@/types/TSonner";

type UIContextProps = {
    isLoading: boolean
    setIsLoading: Dispatch<React.SetStateAction<boolean>>,
    sonner: TSonner|undefined,
    setSonner: Dispatch<React.SetStateAction<TSonner|undefined>>
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {},
    sonner: undefined,
    setSonner: () => {}
});

export default function UIProvider({ children }: { children: ReactNode }) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ sonner, setSonner ] = useState<TSonner|undefined>();

    useEffect(() => {
        if(!sonner) return;
        
        if(sonner.variant === "success") toast.success(sonner.title, { description: sonner.description, position: "top-right", richColors: true });
        if(sonner.variant === "error") toast.error(sonner.title, { description: sonner.description, position: "top-right", richColors: true });
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