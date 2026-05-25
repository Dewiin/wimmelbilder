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
import { GameCardSkeleton } from "@/components/skeletons/GameCardSkeleton"

// contexts
import { useUI } from "@/contexts/UIContext"

// motion
import { AnimatePresence, motion } from "motion/react"

// types
import type { TMap } from "@/types/TMap"

export function HomeScreen() {
    const [ show, setShow ] = useState<boolean>(true);
    const [ maps, setMaps ] = useState<TMap[]>([]);
    const { isLoading, setIsLoading } = useUI();

    useEffect(() => {
        if(maps.length == 0) getMaps(setMaps, setIsLoading);
    }, [maps]);

    return (
        <>
            <AnimatePresence>
                {show && 
                <motion.div 
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -1000 }}
                    className="w-full h-screen flex flex-col justify-center items-center px-15 gap-4"
                >
                    <p className="text-6xl font-extrabold">
                        BILDER
                    </p>
                    <p className="text-sm">
                        Art by {" "}
                        <a
                            href="https://chekavo.artstation.com/"
                            target="_blank"
                            className="hover:underline"
                        >
                            Egor Klyuchnyk    
                        </a> 
                    </p>
                    <Carousel className="w-full md:max-w-lg max-w-xs">
                        <CarouselContent>
                            {isLoading &&
                            <CarouselItem>
                                <GameCardSkeleton />
                            </CarouselItem>
                            }
                            {!isLoading &&
                            <>
                                {maps.map((map, index) => (
                                    <CarouselItem key={index}>
                                        <GameCard map={map} setShow={setShow} />
                                    </CarouselItem>
                                ))}
                            </>
                            }
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