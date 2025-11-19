import { sampleTeams } from "../teams/teams";
import type { GameState } from "../types/types";

export function initializeGame(): GameState {

    return {
        ball: { x: -1, y: -1 },
        ballCarrier: null,
        currentTeam: 'nothing yet',
        gamePhase: 'coin toss',
        half: 1,
        selectedPlayer: null,
        validMoves: [],
        actionPhase: null,
        log: [`Ok, lets start the match`],
        blitzUsed: false,
        passUsed: false,
        foulUsed: false,
        team1: sampleTeams[0],
        team2: sampleTeams[1]
    };
}

export function callDice(dWhat: number): number {
    return Math.floor(Math.random() * dWhat) + 1;
}

export const deviateBall = (currentLocation: { x: number, y: number }): {x: number, y: number} => {
    let directionDice: number = callDice(8);
    let distanceDice: number = callDice(6);

    const directionMap: Record<number, { x: number; y: number }> = {
        1: { x: 0, y: -1 },   // North
        2: { x: 1, y: -1 },   // Northeast
        3: { x: 1, y: 0 },    // East
        4: { x: 1, y: 1 },    // Southeast
        5: { x: 0, y: 1 },    // South
        6: { x: -1, y: 1 },   // Southwest
        7: { x: -1, y: 0 },   // West
        8: { x: -1, y: -1 }   // Northwest
    };

    const direction = directionMap[directionDice];

    return {
        x: currentLocation.x + (direction.x * distanceDice),
        y: currentLocation.y + (direction.y * distanceDice)
    }
};