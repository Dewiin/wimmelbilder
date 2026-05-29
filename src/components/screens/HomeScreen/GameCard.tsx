import { useState } from "react"

// api
import { getLeaderboard } from "@/api/map"

// components
import { GamePreview } from "./GamePreview"
import { GameLeaderboard } from "./GameLeaderboard"

// types
import type { TMap } from "@/types/TMap"
import type { TScore } from "@/types/TScore"

export function GameCard({ map }: { map: TMap }) {
    const [ leaderboard, setLeaderboard ] = useState<TScore[]>([]);
    const [ showLeaderboard, setShowLeaderboard ] = useState<boolean>(false);

    return (
        <>
        {!showLeaderboard && 
            <GamePreview map={map} leaderboard={leaderboard} setLeaderboard={setLeaderboard} setShowLeaderboard={setShowLeaderboard} />
        }
        {showLeaderboard && 
            <GameLeaderboard map={map} leaderboard={leaderboard} setShowLeaderboard={setShowLeaderboard} />
        }
        </>
    )
}