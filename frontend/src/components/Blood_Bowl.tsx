import React, { useEffect} from 'react';

import { useGame } from "../context/GameContext";
import Instructions from './Introductions';
import GameHeader from './GameHeader';
import GameLog from './GameLog';
import ActionMenu from './ActionMenu';
import GameBoard from './GameBoard';

export const PITCH_WIDTH = 26;
export const PITCH_HEIGHT = 15;
export const END_ZONE_WIDTH = 1;
export const CELL_SIZE = 50;

const Blood_Bowl: React.FC = () => {
  const { gameState } = useGame();

  useEffect(() => {
    console.log('gameState: ', gameState);
  });

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-900 to-green-700 p-4 overflow-auto">
      <div className="max-w-7xl mx-auto">

        <GameHeader />

        <div className="flex gap-4">

          <div className="bg-white rounded-lg shadow-lg p-4 w-80">

            <GameLog />

            <div className="mt-4 p-3 bg-gray-50 rounded">

              <ActionMenu />

              <GameBoard />

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