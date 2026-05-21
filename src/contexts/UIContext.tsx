import React, { createContext, useContext, useState } from "react";

type UIContextProps = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {}
});

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const values = {
        isLoading, 
        setIsLoading
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