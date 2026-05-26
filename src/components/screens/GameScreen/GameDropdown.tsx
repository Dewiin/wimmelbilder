import { useNavigate } from "react-router"

// api
import { postSubmission } from '@/api/game'

// components
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LogOut, CircleX } from "lucide-react"

// contexts
import { useUI } from "@/contexts/UIContext"

// motion
import { AnimatePresence, motion } from "motion/react"

// types
import type { SetStateAction, Dispatch } from "react"
import type { TCoords } from "@/types/TCoords"
import type { TCharacter } from "@/types/TCharacter"
import { CharacterProfile } from "./CharacterProfile"
import { toast } from "sonner"

type GameDropdownProps = {
    coords: TCoords,
    menuOpen: boolean,
    setMenuOpen: Dispatch<SetStateAction<boolean>>,
    characters: TCharacter[],
    setCharacters: Dispatch<SetStateAction<TCharacter[]>>
    clickPosition: TCoords,
    mapName: string|undefined,
}
export function GameDropdown({ 
    coords, 
    menuOpen,
    setMenuOpen, 
    characters,
    setCharacters,
    clickPosition,
    mapName
}: GameDropdownProps ) {
    const { setSonner } = useUI();
    const navigate = useNavigate();

    async function handleSubmit(character: TCharacter) {
        if(!mapName) return;

        const body = {
            xCoord: clickPosition.x,
            yCoord: clickPosition.y,
            clientCharacter: character
        }
        toast.promise(
            postSubmission(body, mapName, setCharacters, setSonner),
            { loading: `Finding ${character.name}...`, position: "top-right" }
        )
    }

    return (
        <AnimatePresence>
            <motion.div 
                id="gameDropdown"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                    opacity: 1,
                    scale: 1, 
                    x: coords.x,
                    y: coords.y
                }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 40,
                }}
                style={{ left: 0, top: 0 }}
                className={`absolute w-fit ${menuOpen ? "visible" : "hidden"}`}
            >
                <div className=" 
                    flex flex-col 
                    shadow-md ring-1 ring-foreground/10
                    rounded-lg bg-popover p-2
                ">
                    {characters.map((character) => (
                        <Button 
                            key={character.id}
                            variant="ghost" 
                            className="justify-start text-xs"
                            onClick={() => {
                                setMenuOpen(false);
                                handleSubmit(character)
                            }}
                        >
                            <CharacterProfile 
                                character={character} 
                                cn="border-l-1 border-t-1"
                                width={24} 
                            />
                            {character.name}
                        </Button>
                    ))}

                    <Separator className="my-1" />
                    <Button 
                        variant="ghost" 
                        className="justify-start text-xs"
                        onClick={() => setMenuOpen(false)}    
                        >
                        <CircleX size={12} />
                        Close
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="justify-start text-xs bg-transparent! hover:bg-destructive/20!"
                        onClick={() => navigate("/")}    
                        >
                        <LogOut size={12} />
                        Quit Game
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}