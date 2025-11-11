import { Trophy } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';
import { callDice } from '../functions/gameFunctions';

const GameHeader: React.FC = (): React.ReactElement => {
    const { gameState, setGameState, addLog } = useGame();

    const tossCoin = () => {
        const toss = callDice(2);
        let current = '';

        if (toss === 1) {current = 'home'} else {current = 'away'};

        setGameState(prev => ({
            ...prev,
            currentTeam: current,
            gamePhase: 'deploy defence'
        }));
    }

    function endTurn() {
        const nextTeam = gameState.currentTeam === 'home' ? 'away' : 'home';
        const nextTurn = gameState.currentTeam === 'away' ? gameState.turn + 1 : gameState.turn;
        const nextHalf = nextTurn > 8 && gameState.half === 1 ? 2 : gameState.half;

        // Reset players for new turn
        const resetPlayers = gameState.players.map(p => ({
            ...p,
            hasMoved: false,
            hasActed: false,
            status: p.status === 'down' ? 'standing' : p.status
        }));

        addLog(`Turn ${nextTurn}, ${nextTeam} team's turn`);

        setGameState(prev => ({
            ...prev,
            currentTeam: nextTeam,
            turn: nextTurn > 8 ? 1 : nextTurn,
            half: nextHalf,
            players: resetPlayers,
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
                            Half {gameState.half} - Turn {gameState.turn}/8
                        </p>
                    </div>
                </div>

                <div>
                    <div className={`p-2 rounded ${gameState.currentTeam === 'home' ? 'bg-blue-100' : ''}`}>
                        <div className="text-2xl font-bold text-blue-600">{gameState.score.home}</div>
                        <div className="text-xs">Home</div>
                    </div>
                    <div className={`p-2 rounded ${gameState.currentTeam === 'away' ? 'bg-red-100' : ''}`}>
                        <div className="text-2xl font-bold text-red-600">{gameState.score.away}</div>
                        <div className="text-xs">Away</div>
                    </div>
                </div>

                {
                    (gameState.gamePhase === 'coin toss')?
                    <>
                        <button
                            onClick={tossCoin}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold"
                        >
                            Toss a coin to determine who kicks off
                        </button>
                    </>:<></>
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