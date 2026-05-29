import { useNavigate } from "react-router";

// api
import { getLeaderboard } from "@/api/map";

// components
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// types
import type { Dispatch, SetStateAction } from "react";
import type { TMap } from "@/types/TMap";
import type { TScore } from "@/types/TScore";

type GamePreviewProps = {
    map: TMap,
    leaderboard: TScore[],
    setLeaderboard: Dispatch<SetStateAction<TScore[]>>,
    setShowLeaderboard: Dispatch<SetStateAction<boolean>>
}
export function GamePreview({ map, leaderboard, setLeaderboard, setShowLeaderboard }: GamePreviewProps) {
    const navigate = useNavigate();

    async function handleLeaderboard() {
        if(leaderboard.length > 0) return;
        await getLeaderboard(map.name, setLeaderboard);
    }

    return (
        <Card className="w-full md:h-165 h-115">
            <img
                src={ map.imageUrl }
                alt="Map cover"
                className="relative z-20 aspect-square object-cover grayscale-25"
                />
            <CardHeader className="h-full">
                <CardTitle>{map.name.toLocaleUpperCase()}</CardTitle>
                <CardDescription>{map.description}</CardDescription>
            </CardHeader>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button 
                    className="cursor-pointer hover:bg-muted-foreground transition-colors duration-150 ease-in-out"
                    onClick={() => navigate(`/game/${map.name}`)}
                    >
                    Play Game
                </Button>
                <Button 
                    variant="secondary"
                    className="cursor-pointer hover:bg-muted-foreground/10 transition-colors duration-150 ease-in-out"
                    onClick={() => {
                        handleLeaderboard();
                        setShowLeaderboard(true);
                    }}
                    >
                    Leaderboard
                </Button>
            </CardFooter>
        </Card>
    )
}