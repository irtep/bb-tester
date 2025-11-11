import { sampleTeams } from "../teams/teams";
import type { GameState, Player } from "../types/types";

export function initializeGame(): GameState { /*
    const homePlayers: Player[] = [];
    const awayPlayers: Player[] = [];
*/
    // Create 11 players per team with varied positions

/*
    for (let i = 0; i < 11; i++) {
        const yPos = 2 + i;

        // Home team setup (left side)
        homePlayers.push({
            id: `home-${i}`,
            team: 'home',
            position: { x: 3, y: yPos },
            ma: i < 2 ? 8 : i < 6 ? 6 : 5, // Catchers fast, linemen slow
            st: i < 2 ? 3 : i < 6 ? 3 : 4, // Big guys stronger
            ag: i < 2 ? 2 : 3, // Agility: 2+ is great, 3+ is good
            av: 8,
            status: 'standing',
            hasMoved: false,
            hasActed: false
        });

        // Away team setup (right side)
        awayPlayers.push({
            id: `away-${i}`,
            team: 'away',
            position: { x: 22, y: yPos },
            ma: i < 2 ? 8 : i < 6 ? 6 : 5,
            st: i < 2 ? 3 : i < 6 ? 3 : 4,
            ag: i < 2 ? 2 : 3,
            av: 8,
            status: 'standing',
            hasMoved: false,
            hasActed: false
        });
    }
*/
    return {
        players: [...sampleTeams[0].players, ...sampleTeams[1].players],
        ball: { x: 13, y: 7 }, // Center of pitch
        ballCarrier: null,
        currentTeam: 'home',
        gamePhase: 'coin toss',
        turn: 1,
        half: 1,
        score: { home: 0, away: 0 },
        selectedPlayer: null,
        validMoves: [],
        actionPhase: null,
        log: ['Game started! Home team kicks off.'],
        blitzUsed: false,
        passUsed: false,
        foulUsed: false,
        team1: sampleTeams[0],
        team2: sampleTeams[1]
    };
}

export function rollD6(): number {
    return Math.floor(Math.random() * 6) + 1;
}