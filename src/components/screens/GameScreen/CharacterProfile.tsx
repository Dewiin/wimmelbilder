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
        <div className={`${cn}`}>
            <img 
                className="rounded-sm"
                src={character.imageUrl}  
                {...props}
            />
        </div>
    )
} 