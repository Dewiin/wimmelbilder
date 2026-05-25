// types
import type { TCharacter } from "@/types/TCharacter";
import type { ImgHTMLAttributes } from "react";

type CharacterProfileProps = ImgHTMLAttributes<HTMLImageElement> & {
    character: TCharacter,
    cn?: string,
}
export function CharacterProfile({ 
    character, 
    cn, 
    ...props 
}: CharacterProfileProps) {
    return (
        <div className={`${cn} border-white w-fit`}>
            <img 
                src={character.imageUrl}  
                {...props}
            />
        </div>
    )
} 