import { AlertCircle } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';

const GameLog: React.FC = (): React.ReactElement => {
    const { gameState } = useGame();

    return (
        <div>
            <h3>
                <AlertCircle size={20} />
                Game Log
            </h3>
            <div>
                {gameState.log.map((entry, i) => (
                    <div key={i}>
                        {entry}
                    </div>
                ))}
            </div>
        </div >
    );
}

export default GameLog;