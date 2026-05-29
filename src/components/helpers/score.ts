export function formatScore(scoreMs: number) {
    return Math.round(scoreMs/1000 * 100) / 100;
}