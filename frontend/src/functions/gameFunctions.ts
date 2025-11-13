import { sampleTeams } from "../teams/teams";
import type { GameState, Player } from "../types/types";

export function initializeGame(): GameState {

    return {
        ball: { x: 0, y: 0 }, // Center of pitch
        ballCarrier: null,
        currentTeam: 'nothing yet',
        gamePhase: 'coin toss',
        turn: 1,
        half: 1,
        score: { home: 0, away: 0 },
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