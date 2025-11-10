import React, { useState } from 'react';
import { Dices, Trophy, AlertCircle } from 'lucide-react';
import type { Player, PlayerStatus } from '../types/types';
import { rollD6 } from '../functions/gamePlay';
import { useGame } from "../context/GameContext";
import Instructions from './Introductions';
import GameHeader from './GameHeader';
import GameLog from './GameLog';
import ActionMenu from './ActionMenu';

export const PITCH_WIDTH = 26;
export const PITCH_HEIGHT = 15;
export const END_ZONE_WIDTH = 1;
export const CELL_SIZE = 50;

const Blood_Bowl: React.FC = () => {
  const { gameState, setGameState, addLog } = useGame();
  const [diceRoll, setDiceRoll] = useState<string | null>(null);

  function showDiceRoll(result: string) {
    setDiceRoll(result);
    setTimeout(() => setDiceRoll(null), 2000);
  }

  function selectPlayer(playerId: string) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player || player.team !== gameState.currentTeam || player.status !== 'standing') {
      return;
    }

    setGameState(prev => ({
      ...prev,
      selectedPlayer: playerId,
      validMoves: [],
      actionPhase: 'select_action'
    }));
  }

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

  // 8-direction step-by-step pathfinder (simple direct line)
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
    const roll = rollD6();
    showDiceRoll(`Block: ${roll}`);

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

    const roll = rollD6();
    showDiceRoll(`Foul: ${roll}`);

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

  function handleCellClick(x: number, y: number) {
    // Check if clicking on a valid move
    if (gameState.validMoves.some(m => m.x === x && m.y === y)) {
      movePlayer(x, y);
      return;
    }

    // Check if clicking on a player
    const clickedPlayer = gameState.players.find(p =>
      p.position.x === x && p.position.y === y
    );

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
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-900 to-green-700 p-4 overflow-auto">
      <div className="max-w-7xl mx-auto">

        <GameHeader />

        <div className="flex gap-4">

          <div className="bg-white rounded-lg shadow-lg p-4 w-80">

            <GameLog />

            <div className="mt-4 p-3 bg-gray-50 rounded">

              <ActionMenu />

              {/* Game Board */}
              <div className="bg-green-800 rounded-lg shadow-lg p-4 relative">
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
                          (x < END_ZONE_WIDTH || x >= PITCH_WIDTH - END_ZONE_WIDTH) ? '#86efac' : // End zones (lighter green)
                            gameState.validMoves.some(m => m.x === x && m.y === y) ? '#fbbf24' : // Valid moves
                              '#22c55e' // Field color (lighter green)
                        }
                        stroke="#15803d"
                        strokeWidth="1.5"
                        onClick={() => handleCellClick(x, y)}
                        className="cursor-pointer hover:fill-green-600"
                      />
                    ))
                  )}

                  {/* Draw end zone labels */}
                  <text
                    x={END_ZONE_WIDTH * CELL_SIZE / 2}
                    y={PITCH_HEIGHT * CELL_SIZE / 2}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    transform={`rotate(-90 ${END_ZONE_WIDTH * CELL_SIZE / 2} ${PITCH_HEIGHT * CELL_SIZE / 2})`}
                  >
                    AWAY END ZONE
                  </text>
                  <text
                    x={(PITCH_WIDTH - END_ZONE_WIDTH / 2) * CELL_SIZE}
                    y={PITCH_HEIGHT * CELL_SIZE / 2}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    transform={`rotate(90 ${(PITCH_WIDTH - END_ZONE_WIDTH / 2) * CELL_SIZE} ${PITCH_HEIGHT * CELL_SIZE / 2})`}
                  >
                    HOME END ZONE
                  </text>

                  {/* Draw ball */}
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

                  {/* Draw players */}
                  {gameState.players.map(player => (
                    <g
                      key={player.id}
                      onClick={() => handleCellClick(player.position.x, player.position.y)}
                    >
                      <circle
                        cx={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                        cy={player.position.y * CELL_SIZE + CELL_SIZE / 2}
                        r={12}
                        fill={
                          player.status === 'down'
                            ? '#6b7280'
                            : player.team === 'home'
                              ? '#3b82f6'
                              : '#ef4444'
                        }
                        stroke={player.id === gameState.selectedPlayer ? '#fbbf24' : '#000'}
                        strokeWidth={player.id === gameState.selectedPlayer ? 3 : 1}
                        className="cursor-pointer"
                        opacity={player.status === 'down' ? 0.5 : 1}
                      />

                      {/* Ball indicator */}
                      {gameState.ballCarrier === player.id && (
                        <circle
                          cx={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                          cy={player.position.y * CELL_SIZE + CELL_SIZE / 2}
                          r={6}
                          fill="#fbbf24"
                        />
                      )}

                      {/* Player ID text */}
                      <text
                        x={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                        y={player.position.y * CELL_SIZE + CELL_SIZE / 2 + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {player.id}
                      </text>

                      {/* Player status text (below ID) */}
                      <text
                        x={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                        y={player.position.y * CELL_SIZE + CELL_SIZE / 2 + 13}
                        textAnchor="middle"
                        fill="white"
                        fontSize="6"
                        pointerEvents="none"
                      >
                        {player.status}
                      </text>
                    </g>
                  ))}

                </svg>

                {diceRoll && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-8 text-4xl font-bold">
                    <Dices className="inline mr-2" />
                    {diceRoll}
                  </div>
                )}
              </div>

              {gameState.actionPhase && gameState.actionPhase !== 'select_action' && (
                <p className="text-xs mt-2 text-gray-600">
                  {gameState.actionPhase === 'movement' && 'Click yellow squares to move'}
                  {gameState.actionPhase === 'block' && 'Click adjacent opponent to block'}
                  {gameState.actionPhase === 'blitz_movement' && 'Move first, then block'}
                  {gameState.actionPhase === 'pass' && 'Click target to pass'}
                  {gameState.actionPhase === 'handoff' && 'Click adjacent teammate'}
                  {gameState.actionPhase === 'foul' && 'Click downed opponent to foul'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div >
      <Instructions />
    </div >
  );
};

export default Blood_Bowl;