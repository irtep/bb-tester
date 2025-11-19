import React from 'react';
import { useGame } from '../context/GameContext';
import { CELL_SIZE, END_ZONE_WIDTH, PITCH_HEIGHT, PITCH_WIDTH } from './Blood_Bowl';
import GameLog from './GameLog';
import Bench from './Bench';
import ShowPlayersOnField from './ShowPlayersOnField';
import { callDice } from '../functions/gameFunctions';

type TeamKey = 'team1' | 'team2';

const GameBoard: React.FC = (): React.ReactElement => {
    const { gameState, setGameState } = useGame();

    function selectPlayer(playerId: string) {
        setGameState(prev => ({
            ...prev,
            selectedPlayer: playerId,
            validMoves: []
        }));
    }
    
    const teleportPlayer = (
        teamKey: TeamKey,
        playerId: string,
        targetX: number,
        targetY: number,
        newStatus: string
    ) => {
        setGameState(prev => ({
            ...prev,
            [teamKey]: {
                ...prev[teamKey],
                players: prev[teamKey].players.map(p =>
                    p.id === playerId ? { ...p, position: { x: targetX, y: targetY }, status: newStatus, onField: true } : p
                )
            }
        }));
    };

    const unSelectAndUnAction = () => {
        setGameState(prev => ({
            ...prev,
            selectedPlayer: null,
            actionPhase: null
        }));
    };

    const sendPlayerToBench = (id: string) => {
        console.log('id to bench: ', id);
        setGameState(prev => (
            {
                ...prev,
                team1: {
                    ...prev.team1,
                    players: prev.team1.players.map(p =>
                        p.id === id ? { ...p, onField: false, position: { x: -1, y: -1 }, status: 'on bench' } : p)
                },
                team2: {
                    ...prev.team2,
                    players: prev.team2.players.map(p =>
                        p.id === id ? { ...p, onField: false, position: { x: -1, y: -1 }, status: 'on bench' } : p)
                },
                selectedPlayer: null,
                actionPhase: null
            }
        ));
    };

    /*
    async function movePlayer(targetX: number, targetY: number) {
        if (!gameState.selectedPlayer) return;
    
        const player = gameState.players.find(p => p.id === gameState.selectedPlayer);
        if (!player) return;
    
        const path = findPath(player.position, { x: targetX, y: targetY });
        if (path.length === 0) return;
    
        for (let step of path) {
            // Stop if next cell is occupied
            const occupied = gameState.players.some(p =>
                p.position.x === step.x && p.position.y === step.y && p.status === 'standing'
            );
            if (occupied) {
                addLog(`Path blocked at (${step.x},${step.y})`);
                break;
            }
    
            // Step animation
            await new Promise(res => setTimeout(res, 200)); // adjust for faster/slower walk
    
            setGameState(prev => ({
                ...prev,
                players: prev.players.map(p =>
                    p.id === player.id ? { ...p, position: { x: step.x, y: step.y } } : p
                )
            }));
        }
    
        // End of movement
        setGameState(prev => ({
            ...prev,
            players: prev.players.map(p =>
                p.id === player.id ? { ...p, hasMoved: true } : p
            ),
            selectedPlayer: null,
            validMoves: [],
            actionPhase: null
        }));
    }
    */

    // 8-direction step-by-step pathfinder (simple direct line)
    /*
        function findPath(start: { x: number; y: number }, end: { x: number; y: number }) {
            const path: { x: number; y: number }[] = [];
            let { x, y } = start;
     
            while (x !== end.x || y !== end.y) {
                let dx = end.x - x;
                let dy = end.y - y;
     
                // Normalize step to -1, 0, or +1 in each direction
                if (dx !== 0) dx = dx > 0 ? 1 : -1;
                if (dy !== 0) dy = dy > 0 ? 1 : -1;
     
                x += dx;
                y += dy;
     
                path.push({ x, y });
            }
     
            return path;
        }
    */
    /*
        function attemptBlock(targetId: string) {
            if (!gameState.selectedPlayer) return;
     
            const attacker = gameState.players.find(p => p.id === gameState.selectedPlayer);
            const defender = gameState.players.find(p => p.id === targetId);
     
            if (!attacker || !defender) return;
     
            // Check adjacency
            const adjacent = Math.abs(attacker.position.x - defender.position.x) <= 1 &&
                Math.abs(attacker.position.y - defender.position.y) <= 1;
     
            if (!adjacent) {
                addLog('Target must be adjacent!');
                return;
            }
     
            // Simplified block: compare strength
            const roll = callDice(6);
     
            const success = roll + attacker.st > defender.st + 3;
     
            if (success) {
                const updatedPlayers = gameState.players.map(p =>
                    p.id === targetId ? { ...p, status: 'down' as PlayerStatus } : p
                );
     
                // Ball scatters if carrier knocked down
                let newBall = gameState.ball;
                let newBallCarrier = gameState.ballCarrier;
     
                if (gameState.ballCarrier === targetId) {
                    newBall = { ...defender.position };
                    newBallCarrier = null;
                    addLog(`Ball carrier knocked down! Ball scatters!`);
                }
     
                addLog(`${attacker.id} blocks ${defender.id} down!`);
     
                setGameState(prev => ({
                    ...prev,
                    players: updatedPlayers.map(p =>
                        p.id === attacker.id ? { ...p, hasActed: true } : p
                    ),
                    ball: newBall,
                    ballCarrier: newBallCarrier,
                    selectedPlayer: null,
                    validMoves: [],
                    actionPhase: null
                }));
            } else {
                addLog(`Block failed!`);
                setGameState(prev => ({
                    ...prev,
                    selectedPlayer: null,
                    validMoves: [],
                    actionPhase: null
                }));
            }
        }
    */
    /*
        function attemptHandoff(targetId: string) {
            if (!gameState.selectedPlayer || gameState.ballCarrier !== gameState.selectedPlayer) return;
     
            const passer = gameState.players.find(p => p.id === gameState.selectedPlayer);
            const receiver = gameState.players.find(p => p.id === targetId);
     
            if (!passer || !receiver || receiver.team !== passer.team) return;
     
            // Check adjacency
            const adjacent = Math.abs(passer.position.x - receiver.position.x) <= 1 &&
                Math.abs(passer.position.y - receiver.position.y) <= 1;
     
            if (!adjacent) {
                addLog('Receiver must be adjacent!');
                return;
            }
     
            addLog(`${passer.id} hands off to ${receiver.id}!`);
     
            setGameState(prev => ({
                ...prev,
                ballCarrier: receiver.id,
                selectedPlayer: null,
                validMoves: [],
                actionPhase: null
            }));
        }
    */
    /*
        function attemptFoul(targetId: string) {
            if (!gameState.selectedPlayer) return;
     
            const fouler = gameState.players.find(p => p.id === gameState.selectedPlayer);
            const target = gameState.players.find(p => p.id === targetId);
     
            if (!fouler || !target || target.status !== 'down') return;
     
            // Check adjacency
            const adjacent = Math.abs(fouler.position.x - target.position.x) <= 1 &&
                Math.abs(fouler.position.y - target.position.y) <= 1;
     
            if (!adjacent) {
                addLog('Target must be adjacent!');
                return;
            }
     
            const roll = callDice(6);
     
            if (roll >= 5) {
                const updatedPlayers = gameState.players.map(p =>
                    p.id === targetId ? { ...p, status: 'ko' as PlayerStatus } : p
                );
                addLog(`Foul successful! ${target.id} is knocked out!`);
     
                setGameState(prev => ({
                    ...prev,
                    players: updatedPlayers,
                    selectedPlayer: null,
                    validMoves: [],
                    actionPhase: null
                }));
            } else {
                addLog(`Foul failed!`);
                setGameState(prev => ({
                    ...prev,
                    selectedPlayer: null,
                    validMoves: [],
                    actionPhase: null
                }));
            }
        }
    */
    function handleCellClick(x: number, y: number) {
        // console.log('clicked ', x, y);

        // Check if clicking on a player
        const clickedPlayer =
            [...gameState.team1.players, ...gameState.team2.players].find(
                p => p.position.x === x && p.position.y === y
            );


        // ----------------------------------
        // deploy defence and offense phase:
        // -----------------------------------

        if (gameState.gamePhase === 'deploy defence' || gameState.gamePhase === 'deploy offense') {

            // if clicks other player that is in turn, select it
            if (clickedPlayer && clickedPlayer.id !== gameState.selectedPlayer && gameState.currentTeam === clickedPlayer.team) {
                console.log('selecting other pl');
                selectPlayer(clickedPlayer.id);
                return;
            } else {
                console.log(`didn't find other own player: `, clickedPlayer, clickedPlayer?.id !== gameState.selectedPlayer, gameState.currentTeam === clickedPlayer?.team);
            }

            // if selected already, then un-deploy
            if (clickedPlayer && clickedPlayer.id === gameState.selectedPlayer && gameState.currentTeam === clickedPlayer.team) {
                sendPlayerToBench(clickedPlayer.id);
                return;
            }

            // check if occupied
            const occupied =
                [...gameState.team1.players, ...gameState.team2.players].some(
                    p => p.position.x === x && p.position.y === y && p.status === "standing"
                );
            console.log('if occupied: ', occupied);
            // if someone is selected and the place is not occupied, move this player to there
            if (gameState.selectedPlayer && !occupied) {
                const teamKey: 'team1' | 'team2' = gameState.currentTeam === gameState.team1.name ? 'team1' : 'team2';

                console.log('all ok, moving ', gameState.selectedPlayer, ' to ', x, y);
                teleportPlayer(teamKey, gameState.selectedPlayer, x, y, 'standby');
                // unselect and un order:
                unSelectAndUnAction();
            } else {

            }
        }

        // Check if clicking on a valid move
        /*
        if (gameState.validMoves.some(m => m.x === x && m.y === y)) {
            movePlayer(x, y);
            return;
        }
        */

        /*
                if (clickedPlayer) {
                    if (clickedPlayer.team === gameState.currentTeam && gameState.actionPhase !== 'block' && gameState.actionPhase !== 'handoff' && gameState.actionPhase !== 'foul') {
                        selectPlayer(clickedPlayer.id);
                    } else if (gameState.selectedPlayer) {
                        // Different actions based on current action phase
                        if (gameState.actionPhase === 'block' || gameState.actionPhase === 'blitz_movement') {
                            if (clickedPlayer.team !== gameState.currentTeam && clickedPlayer.status === 'standing') {
                                attemptBlock(clickedPlayer.id);
                            }
                        } else if (gameState.actionPhase === 'handoff') {
                            if (clickedPlayer.team === gameState.currentTeam) {
                                attemptHandoff(clickedPlayer.id);
                            }
                        } else if (gameState.actionPhase === 'foul') {
                            if (clickedPlayer.team !== gameState.currentTeam && clickedPlayer.status === 'down') {
                                attemptFoul(clickedPlayer.id);
                            }
                        }
                    }
                }
                    */
    }
    return (
        <div>
            {/* TEAMS ROW */}

            <div style={{ display: 'flex', width: '100vw' }}>
                <div style={{ width: "50%" }}>
                    <Bench team={gameState.team1} />
                </div>

                <div style={{ width: '50%' }}>
                    <Bench team={gameState.team2} />
                </div>
            </div>

            {/* BOARD */}
            <div style={{ display: 'flex', width: '100vw' }}>
                <div style={{ width: "85%" }}>
                    <svg width={PITCH_WIDTH * CELL_SIZE} height={PITCH_HEIGHT * CELL_SIZE}>
                        {/* Draw grid */}
                        {Array.from({ length: PITCH_WIDTH }).map((_, x) =>
                            Array.from({ length: PITCH_HEIGHT }).map((_, y) => (
                                <rect
                                    key={`${x}-${y}`}
                                    x={x * CELL_SIZE}
                                    y={y * CELL_SIZE}
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    fill={
                                        x < END_ZONE_WIDTH || x >= PITCH_WIDTH - END_ZONE_WIDTH
                                            ? "#86efac"
                                            : gameState.validMoves.some((m) => m.x === x && m.y === y)
                                                ? "#fbbf24"
                                                : "#22c55e"
                                    }
                                    stroke="#15803d"
                                    strokeWidth="1.5"
                                    onClick={() => handleCellClick(x, y)}
                                    className="cursor-pointer hover:fill-green-600"
                                />
                            ))
                        )}

                        {/* End zone labels */}
                        <text
                            x={(END_ZONE_WIDTH * CELL_SIZE) / 2}
                            y={(PITCH_HEIGHT * CELL_SIZE) / 2}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            transform={`rotate(-90 ${(END_ZONE_WIDTH * CELL_SIZE) / 2
                                } ${(PITCH_HEIGHT * CELL_SIZE) / 2})`}
                        >
                            {gameState.team2.name}
                        </text>
                        <text
                            x={(PITCH_WIDTH - END_ZONE_WIDTH / 2) * CELL_SIZE}
                            y={(PITCH_HEIGHT * CELL_SIZE) / 2}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            transform={`rotate(90 ${(PITCH_WIDTH - END_ZONE_WIDTH / 2) * CELL_SIZE
                                } ${(PITCH_HEIGHT * CELL_SIZE) / 2})`}
                        >
                            {gameState.team1.name}
                        </text>

                        {/* Scrimmage & wide zone lines */}
                        <line
                            x1={(PITCH_WIDTH * CELL_SIZE) / 2}
                            y1={0}
                            x2={(PITCH_WIDTH * CELL_SIZE) / 2}
                            y2={PITCH_HEIGHT * CELL_SIZE}
                            stroke="#15803d"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                        />
                        <line
                            x1={0}
                            y1={4 * CELL_SIZE}
                            x2={PITCH_WIDTH * CELL_SIZE}
                            y2={4 * CELL_SIZE}
                            stroke="#15803d"
                            strokeWidth="3"
                        />
                        <line
                            x1={0}
                            y1={(PITCH_HEIGHT - 4) * CELL_SIZE}
                            x2={PITCH_WIDTH * CELL_SIZE}
                            y2={(PITCH_HEIGHT - 4) * CELL_SIZE}
                            stroke="#15803d"
                            strokeWidth="3"
                        />

                        {/* Ball */}
                        {gameState.ball && !gameState.ballCarrier && (
                            <circle
                                cx={gameState.ball.x * CELL_SIZE + CELL_SIZE / 2}
                                cy={gameState.ball.y * CELL_SIZE + CELL_SIZE / 2}
                                r={8}
                                fill="#fbbf24"
                                stroke="#92400e"
                                strokeWidth="2"
                            />
                        )}

                        {/* Players */}
                        <ShowPlayersOnField
                            team={gameState.team1}
                            gameState={gameState}
                            handleCellClick={handleCellClick}
                        />
                        <ShowPlayersOnField
                            team={gameState.team2}
                            gameState={gameState}
                            handleCellClick={handleCellClick}
                        />

                    </svg>
                </div>
                <div style={{ width: "15%" }}>
                    <GameLog />
                </div>
            </div>
        </div>
    );
};
export default GameBoard;
