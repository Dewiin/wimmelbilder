import { useNavigate } from "react-router"

// components
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

// motion
import { AnimatePresence, motion } from "motion/react"

// types
import type { TCoords } from "@/types/TCoords"

export function GameDropdown({ coords }: { coords: TCoords }) {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.05 }}
                className="absolute w-3xs"
                style={{
                    left: coords.x,
                    top: coords.y
                }}
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