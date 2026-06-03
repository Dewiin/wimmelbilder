import { useState, useEffect } from "react";

// components
import { CharacterProfile } from "./CharacterProfile";

// motion
import { AnimatePresence, motion } from "motion/react";

// types
import type { TCharacter } from "@/types/TCharacter";

export function GameHUD({ characters }: { characters: TCharacter[] } ) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AnimatePresence>
            {characters.length > 0 && 
                <motion.div
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="fixed top-2 left-0 
                    w-full flex justify-center z-99"
                >
                    <div
                        className="bg-white p-0.5 rounded-sm 
                        outline-2 outline-popover
                        w-fit flex justify-center"
                    >
                        { characters.map((character) => (
                            <CharacterProfile 
                            key={character.id}
                            character={character} 
                            cn="border-l-3 border-t-3"
                            width={isMobile ? 32 : 64}
                            />
                        )) }
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}