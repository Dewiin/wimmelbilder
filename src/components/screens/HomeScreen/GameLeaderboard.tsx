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

// helpers
import { formatScore } from "@/components/helpers/score"

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
            <CardContent className="h-full overflow-scroll flex flex-col gap-4 items-center md:py-8 py-4">
                {leaderboard.length === 0 &&
                    <p className="text-center my-12">No scores yet.</p>
                }
                {leaderboard.map((score, index) => (
                    <div 
                        key={score.id}
                        className={`flex md:flex-row flex-col 
                            md:justify-between items-center
                            md:w-xs w-3xs 
                            md:p-8 p-2 
                            md:text-base
                            outline-4 rounded-sm
                            ${index === 0 && "outline-yellow-600"}    
                            ${index === 1 && "outline-slate-400"}    
                            ${index === 2 && "outline-orange-900"}    
                        `}
                    >
                        <p className="font-extrabold">{score.username}</p>
                        <p>{formatScore(score.timeMs)} seconds</p>
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