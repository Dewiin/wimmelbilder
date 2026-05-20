import { useNavigate } from "react-router"

// components
import { 
    Card, 
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// types
import type { TMap } from "@/types/TMap"

export function GameCard({ map }: { map: TMap }) {
    const navigate = useNavigate();

    return (
        <Card className="w-full">
            <img
                src={ map.imageUrl }
                alt="Map cover"
                className="relative z-20 aspect-square object-cover grayscale-25"
            />
            <CardHeader>
                <CardTitle>{map.name.charAt(0).toLocaleUpperCase() + map.name.slice(1)}</CardTitle>
                <CardDescription>{map.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button 
                    className="w-full"
                    onClick={() => navigate(`/game/${map.name}`)}
                >
                    Play Game
                </Button>
            </CardFooter>
        </Card>
    )
}