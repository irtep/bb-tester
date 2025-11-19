import React from 'react';
import { useGame } from '../context/GameContext';
import { getAdjacentDownedOpponents, getAdjacentOpponents, getAdjacentTeammates } from '../functions/getters';
import type { Player } from '../types/types';
import { PITCH_HEIGHT, PITCH_WIDTH } from './Blood_Bowl';

const ActionMenu: React.FC = (): React.ReactElement => {
    const { gameState, setGameState, addLog } = useGame();

    function getValidMoves(player: Player): { x: number; y: number }[] {
        if (player.status !== 'standing' || player.hasMoved) return [];

        const moves: { x: number; y: number }[] = [];
        const range = player.ma;

        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const dist = Math.abs(dx) + Math.abs(dy);
                if (dist === 0 || dist > range) continue;

                const newX = player.position.x + dx;
                const newY = player.position.y + dy;

                if (newX >= 0 && newX < PITCH_WIDTH && newY >= 0 && newY < PITCH_HEIGHT) {
                    const occupied = [...gameState.team1.players, ...gameState.team2.players].some(p =>
                        p.position.x === newX && p.position.y === newY && p.status === 'standing'
                    );
                    if (!occupied) {
                        moves.push({ x: newX, y: newY });
                    }
                }
            }
        }

        return moves;
    }

    function selectAction(action: 'move' | 'block' | 'blitz' | 'pass' | 'handoff' | 'foul') {
        const player = [...gameState.team1.players, ...gameState.team2.players].find(p => p.id === gameState.selectedPlayer);
        if (!player) return;

        if (action === 'move') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'movement',
                validMoves: getValidMoves(player)
            }));
        } else if (action === 'block') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'block'
            }));
            addLog('Click an adjacent opponent to block');
        } else if (action === 'blitz') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'blitz_movement',
                validMoves: getValidMoves(player),
                blitzUsed: true
            }));
            addLog('Move first, then you can block');
        } else if (action === 'pass') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'pass',
                passUsed: true
            }));
            addLog('Click a target square to pass');
        } else if (action === 'handoff') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'handoff'
            }));
            addLog('Click an adjacent teammate to hand off');
        } else if (action === 'foul') {
            setGameState(prev => ({
                ...prev,
                actionPhase: 'foul',
                foulUsed: true
            }));
            addLog('Click a downed opponent to foul');
        }
    }

    return (
        <div>
            jou
            {gameState.selectedPlayer && gameState.gamePhase === 'game' && gameState.actionPhase === 'select_action' && (() => {
                const player = [...gameState.team1.players, ...gameState.team2.players].find(p => p.id === gameState.selectedPlayer);
                if (!player) return null;

                const hasAdjacentOpponents = getAdjacentOpponents(player, gameState).length > 0;
                const hasAdjacentTeammates = getAdjacentTeammates(player, gameState).length > 0;
                const hasAdjacentDownedOpponents = getAdjacentDownedOpponents(player, gameState).length > 0;
                const hasBall = gameState.ballCarrier === player.id;

                return (
                    <div className="mt-3 space-y-2">
                        <p className="text-xs font-bold text-gray-700">Choose Action:</p>

                        <button
                            onClick={() => selectAction('move')}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded"
                        >
                            Move (MA: {player.ma})
                        </button>

                        {hasAdjacentOpponents && (
                            <button
                                onClick={() => selectAction('block')}
                                className="w-full bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded"
                            >
                                Block
                            </button>
                        )}

                        {!gameState.blitzUsed && (
                            <button
                                onClick={() => selectAction('blitz')}
                                className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs py-2 px-3 rounded"
                            >
                                Blitz (Move + Block)
                            </button>
                        )}

                        {hasBall && !gameState.passUsed && (
                            <button
                                onClick={() => selectAction('pass')}
                                className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded"
                            >
                                Pass
                            </button>
                        )}

                        {hasBall && hasAdjacentTeammates && (
                            <button
                                onClick={() => selectAction('handoff')}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs py-2 px-3 rounded"
                            >
                                Hand-off
                            </button>
                        )}

                        {hasAdjacentDownedOpponents && !gameState.foulUsed && (
                            <button
                                onClick={() => selectAction('foul')}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 px-3 rounded"
                            >
                                Foul
                            </button>
                        )}

                        <button
                            onClick={() => setGameState(prev => ({ ...prev, selectedPlayer: null, actionPhase: null }))}
                            className="w-full bg-gray-400 hover:bg-gray-500 text-white text-xs py-1 px-3 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                );
            })()}
        </div >
    );
}

export default ActionMenu;