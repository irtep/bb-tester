import React, { useEffect } from 'react';

import { useGame } from "../context/GameContext";
import Instructions from './Introductions';
import GameHeader from './GameHeader';
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
    <div>
      <div>
        <GameHeader />
        <div>
          <div>
            <h4>Current Turn</h4>
            <p>
              {`${gameState.currentTeam.toUpperCase()} `}
            </p>
            <div>
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