// components
import { CharacterProfile } from "./CharacterProfile";

// motion
import { AnimatePresence, motion } from "motion/react";

// types
import type { TCharacter } from "@/types/TCharacter";

export function GameHUD({ characters }: { characters: TCharacter[] } ) {

    return (
        <AnimatePresence>
            {characters.length > 0 && 
                <motion.div
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="fixed top-2 left-5 
                    bg-popover p-2 rounded-sm
                    w-fit flex justify-center gap-2 flex-wrap"
                >
                    { characters.map((character) => (
                        <CharacterProfile 
                        key={character.id}
                        character={character} 
                        cn="border-l-3 border-t-3"
                        width={64}
                        />
                    )) }
                </motion.div>
            }
        </AnimatePresence>
    )
}