import { useNavigate } from "react-router"

// components
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

// motion
import { AnimatePresence, motion } from "motion/react"

// types
import type React from "react"
import type { SetStateAction } from "react"
import type { TCoords } from "@/types/TCoords"

export function GameDropdown({ coords, setMenuOpen }: { coords: TCoords, setMenuOpen: React.Dispatch<SetStateAction<boolean>> }) {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ 
                    opacity: 1,
                    scale: 1, 
                    x: coords.x,
                    y: coords.y
                }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 40,
                }}
                style={{ left: 0, top: 0 }}
                className="absolute w-3xs"
            >
                <div className=" 
                    flex flex-col 
                    shadow-md ring-1 ring-foreground/10
                    rounded-lg bg-popover p-2
                ">
                    <Button variant="ghost" className="justify-start text-sm">Item 1</Button>
                    <Button variant="ghost" className="justify-start text-sm">Item 2</Button>
                    <Button variant="ghost" className="justify-start text-sm">Item 3</Button>
                    <Separator className="my-1" />
                    <Button 
                        variant="ghost" 
                        className="justify-start text-sm"
                        onClick={() => setMenuOpen(false)}    
                    >
                        Close
                    </Button>
                    <Button 
                        variant="destructive" 
                        className="justify-start text-sm bg-transparent! hover:bg-destructive/20!"
                        onClick={() => navigate("/")}    
                    >
                        Quit Game
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}