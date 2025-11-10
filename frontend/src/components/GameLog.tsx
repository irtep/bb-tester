import { AlertCircle } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';

const GameLog: React.FC = (): React.ReactElement => {
    const { gameState } = useGame();

    return (
        <div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <AlertCircle size={20} />
                Game Log
            </h3>

            <div className="space-y-1 text-sm max-h-96 overflow-y-auto">
                {gameState.log.map((entry, i) => (
                    <div key={i} className="border-b pb-1 text-gray-700">
                        {entry}
                    </div>
                ))}
            </div>

            <h4 className="font-bold text-sm mb-2">Current Turn</h4>
            <p className="text-sm">
                <span className={gameState.currentTeam === 'home' ? 'text-blue-600' : 'text-red-600'}>
                    {gameState.currentTeam.toUpperCase()}
                </span> team
            </p>
        </div >
    );
}

export default GameLog;