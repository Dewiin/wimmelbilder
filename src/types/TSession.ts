import type { TCharacter } from "./TCharacter"
import type { TScore } from "./TScore"

export type TSession = {
    id: string,
    createdAt: Date,
    completedAt?: Date,
    score?: TScore,
    found?: TCharacter[] 
}