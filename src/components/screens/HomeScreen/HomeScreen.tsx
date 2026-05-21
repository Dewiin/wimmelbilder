import { useEffect, useState } from "react"

// api
import { getMaps } from "@/api/map"

// components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { GameCard } from "./GameCard"

// motion
import { AnimatePresence, motion } from "motion/react"

// types
import type { TMap } from "@/types/TMap"

export function HomeScreen() {
    const [ show, setShow ] = useState<boolean>(true);
    const [ maps, setMaps ] = useState<TMap[]>([]);

    useEffect(() => {
        if(maps.length == 0) getMaps(setMaps);
    }, [maps]);

    return (
        <>
            <AnimatePresence>
                {show && 
                <motion.div 
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -1000 }}
                    className="w-full h-full flex flex-col justify-center items-center px-15 gap-8"
                >
                    <p className="text-4xl font-extrabold">
                        BILDER
                    </p>
                    <Carousel className="w-full md:max-w-lg max-w-xs">
                        <CarouselContent>
                            {maps.map((map, index) => (
                                <CarouselItem key={index}>
                                    <GameCard map={map} setShow={setShow} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </motion.div>   
                }
            </AnimatePresence>
        </>
    )
}