
// components
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// types
import type { TMap } from "@/types/TMap"
import type { TScore } from "@/types/TScore"
import type { Dispatch, SetStateAction } from "react"

type GameLeaderboardProps = {
    map: TMap,
    leaderboard: TScore[],
    setShowLeaderboard: Dispatch<SetStateAction<boolean>>
}
export function GameLeaderboard({ map, leaderboard, setShowLeaderboard }: GameLeaderboardProps) {
    return (
        <Card className="w-full md:h-165 h-115">
            <CardHeader className="text-center">
                <CardTitle className="md:text-4xl text-2xl">LEADERBOARD</CardTitle>
                <CardDescription>Fastest times on {map.name.toLocaleUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent className="h-full overflow-scroll flex flex-col items-center md:py-8 py-4">
                {leaderboard.length === 0 &&
                    <p className="text-center my-12">No scores yet.</p>
                }
                {leaderboard.map((score, index) => (
                    <div 
                        key={score.id}
                        className={`flex md:gap-24 gap-8 md:p-8 p-4 text-base outline-3 rounded-sm
                            ${index === 0 && "outline-yellow-600"}    
                            ${index === 1 && "outline-slate-600"}    
                            ${index === 2 && "outline-orange-900"}    
                        `}
                    >
                        <p>{score.username}</p>
                        <p>{Math.round(score.timeMs/1000 * 100) / 100} seconds</p>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button 
                    className="w-full cursor-pointer hover:bg-muted-foreground transition-colors duration-150 ease-in-out"
                    onClick={() => setShowLeaderboard(false)}
                    >
                    Back
                </Button>
            </CardFooter>
        </Card>
    )
}