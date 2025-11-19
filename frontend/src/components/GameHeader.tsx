import { Trophy } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';
import { callDice, deviateBall } from '../functions/gameFunctions';
import type { Player } from '../types/types';

const GameHeader: React.FC = (): React.ReactElement => {
    const { gameState, setGameState, addLog } = useGame();

    const tossCoin = (team1Name: string, team2Name: string) => {
        const toss = callDice(2);
        let current = '';

        if (toss === 1) { current = team1Name } else { current = team2Name };

        addLog(`${current} kicks! and deploys now a defence formation.`);

        setGameState(prev => ({
            ...prev,
            currentTeam: current,
            gamePhase: 'deploy defence'
        }));
    }

    const isTeamDeployed = (homeTeam: boolean, players: Player[], defence: boolean) => {
        // Define deployment zones based on team
        const scrimmageX = homeTeam ? 12 : 13;
        const validSide = homeTeam ? (x: number) => x <= 12 : (x: number) => x >= 13;

        // Count players in different zones
        let scrimmagePlayers = 0;
        let wideZone1Players = 0; // y: 0-3
        let wideZone2Players = 0; // y: 11-14
        let countOfDeployedPlayers = 0;

        // Check each player
        for (const player of players) {
            const { x, y } = player.position;

            // Rule 4: Check if player is on correct side of pitch
            if (!validSide(x) && player.onField) {
                addLog(`Player at (${x}, ${y}) is on the wrong side of the pitch`)
            }

            // Count players in scrimmage line
            if (x === scrimmageX && player.onField) {
                scrimmagePlayers++;
            }

            // Count players in wide zones
            if (y >= 0 && y <= 3 && player.onField) {
                wideZone1Players++;
            }
            if (y >= 11 && y <= 14 && player.onField) {
                wideZone2Players++;
            }

            // total count of deployed players
            if (player.onField) {
                countOfDeployedPlayers++;
            }
        }

        // Rule 1: Check minimum 3 players on line of scrimmage
        if (scrimmagePlayers < 3) {
            addLog(`Only ${scrimmagePlayers} players on line of scrimmage. Minimum 3 required.`);
            return;
        }

        // Rule 2: Check maximum 2 players in each wide zone
        if (wideZone1Players > 2) {
            addLog(`${wideZone1Players} players in wide zone 1 (y: 0-3). Maximum 2 allowed.`);
            return;
        }

        if (wideZone2Players > 2) {
            addLog(`${wideZone2Players} players in wide zone 1 (y: 0-3). Maximum 2 allowed.`);
            return;
        }

        // check if more than 11 players are deployed
        if (countOfDeployedPlayers > 11) {
            addLog(`${wideZone2Players} More than 11 players deployed.`);
            return;
        }        

        // All checks passed

        addLog(`Defensive formation deployed. Offensive deploys now.`);

        setGameState(prev => ({
            ...prev,
            // if offensive deployed, place the ball to sweet spot, else can stay in -1 -1
            ball: !defence ?
                (gameState.currentTeam === gameState.team1.name ? deviateBall({x: 6, y: 6}): deviateBall({x: 20, y: 6})) :
                prev.ball,

            // when kick off is coded properly, will use this:    
            //gamePhase: defence ? 'deploy offense' : 'kick off',

            // but now goes directly to match:
            gamePhase: defence ? 'deploy offense' : 'game',

            /* will be like that when proper kick off is coded, where kicker places the ball:
            currentTeam: (gameState.currentTeam === gameState.team1.name) ? gameState.team2.name : gameState.team1.name
            but now when it is just placed to "sweet spot", team in offense continues */

            // if goes to temporary kick, the current team doesn't change
            currentTeam: defence ? 
                ((gameState.currentTeam === gameState.team1.name) ? gameState.team2.name : gameState.team1.name) :
                prev.currentTeam
        }));
    };

    function endTurn() {
        const nextTeam = gameState.currentTeam === gameState.team1.name ? gameState.team2.name : gameState.team1.name;
        //const nextHalf = nextTurn > 8 && gameState.half === 1 ? 2 : gameState.half;

        // Reset players for new turn
        /*
        const resetPlayers = gameState.players.map(p => ({
            ...p,
            hasMoved: false,
            hasActed: false,
            status: p.status === 'down' ? 'standing' : p.status
        }));
*/
        //addLog(`Turn ${nextTurn}, ${nextTeam} team's turn`);

        setGameState(prev => ({
            ...prev,
            currentTeam: nextTeam,
            half: 1,
            // players: resetPlayers,
            selectedPlayer: null,
            validMoves: [],
            actionPhase: null,
            blitzUsed: false,
            passUsed: false,
            foulUsed: false
        }));
    }

    return (
        < div>
            <div>
                <div>
                    <Trophy className="text-yellow-500" />
                    <div>
                        <h1>Blood Bowl</h1>
                        <p>
                            Half {gameState.half}
                        </p>
                    </div>
                </div>
                <div>
                    <div>{`${gameState.team1.goalsInthisMatch} ${gameState.team1.name} / ${gameState.team2.goalsInthisMatch} ${gameState.team2.name}`}</div>
                </div>
                {
                    (gameState.gamePhase === 'coin toss') ?
                        <>
                            <button
                                onClick={() => { tossCoin(gameState.team1.name, gameState.team2.name) }}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
                            >
                                Toss a coin to determine who kicks off
                            </button>
                        </> : <></>
                }
                {
                    (gameState.gamePhase === 'deploy defence') ?
                        <>
                            <button
                                onClick={() => {
                                    let isTeam1 = false;
                                    let isHomeTeam = false;

                                    if (gameState.currentTeam === gameState.team1.name) { isTeam1 = true; }
                                    if (isTeam1 && gameState.team1.homeTeam || !isTeam1 && gameState.team2.homeTeam) { isHomeTeam = true; }

                                    isTeamDeployed(isHomeTeam, isTeam1 ? gameState.team1.players : gameState.team2.players, true)

                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
                            >
                                Defence Deployment is ready.
                            </button>
                        </> : <></>
                }
                {
                    (gameState.gamePhase === 'deploy offense') ?
                        <>
                            <button
                                onClick={() => {
                                    let isTeam1 = false;
                                    let isHomeTeam = false;

                                    if (gameState.currentTeam === gameState.team1.name) { isTeam1 = true; }
                                    if (isTeam1 && gameState.team1.homeTeam || !isTeam1 && gameState.team2.homeTeam) { isHomeTeam = true; }

                                    isTeamDeployed(isHomeTeam, isTeam1 ? gameState.team1.players : gameState.team2.players, false)

                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
                            >
                                Offense Deployment is ready.
                            </button>
                        </> : <></>
                }
                <button
                    onClick={endTurn}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
                >
                    End Turn
                </button>
            </div>
        </div >
    );
}

export default GameHeader;