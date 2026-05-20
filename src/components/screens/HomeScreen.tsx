import { useEffect, useState } from "react"

// api
import { getMaps } from "@/api/game"

// components
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { GameCard } from "@/components/GameCard/GameCard"

// types
import type { TMap } from "@/types/TMap"

export function HomeScreen() {
    const [ maps, setMaps ] = useState<TMap[]>([]);

    useEffect(() => {
        getMaps(setMaps);
    }, []);

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center px-15">
                <Carousel className="w-full md:max-w-xl max-w-xs">
                    <CarouselContent>
                        {maps.map((map, index) => (
                            <CarouselItem key={index}>
                                <GameCard map={map} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            </div>   
        </>
    )
}