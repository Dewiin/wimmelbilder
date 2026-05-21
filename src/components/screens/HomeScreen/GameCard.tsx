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

export function GameCard({ map, setShow }: { map: TMap, setShow: Function }) {
    const navigate = useNavigate();

    async function handleNavigate() {
        setShow(false);

        setTimeout(() => {
            navigate(`/game/${map.name}`);
        }, 300);
    }

    return (
        <Card className="w-full">
            <img
                src={ map.imageUrl }
                alt="Map cover"
                className="relative z-20 aspect-square object-cover grayscale-25"
                />
            <CardHeader>
                <CardTitle>{map.name.toLocaleUpperCase()}</CardTitle>
                <CardDescription>{map.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button 
                    className="w-full cursor-pointer hover:bg-muted-foreground transition-colors duration-150 ease-in-out"
                    onClick={() => handleNavigate()}
                    >
                    Play Game
                </Button>
            </CardFooter>
        </Card>
    )
}