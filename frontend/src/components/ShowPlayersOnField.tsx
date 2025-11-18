import React from "react";
import type { BloodBowlTeam, Player, GameState } from "../types/types";
import { BIG_BASE, CELL_SIZE, MEDIUM_BASE, SMALL_BASE, VERY_SMALL_BASE } from "./Blood_Bowl";

interface ShowPlayersOnFieldProps {
  team: BloodBowlTeam;
  gameState: GameState;
  handleCellClick: (x: number, y: number) => void;
}

export const ShowPlayersOnField: React.FC<ShowPlayersOnFieldProps> = ({
  team,
  gameState,
  handleCellClick,
}) => {
  return (
    <>
      {team.players.map((player: Player) => {
        if (player.onField) {
          return (
            <g
              key={player.id}
              onClick={() => handleCellClick(player.position.x, player.position.y)}
            >
              {/* Player circle */}
              <circle
                cx={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                cy={player.position.y * CELL_SIZE + CELL_SIZE / 2}
                r={
                  player.baseSize === "very small"
                    ? VERY_SMALL_BASE
                    : player.baseSize === "small"
                      ? SMALL_BASE
                      : player.baseSize === "medium"
                        ? MEDIUM_BASE
                        : BIG_BASE
                }
                fill={team.teamColors.color1}
                stroke={player.id === gameState.selectedPlayer ? "#fbbf24" : "#000"}
                strokeWidth={player.id === gameState.selectedPlayer ? 3 : 1}
                className="cursor-pointer"
                opacity={player.status === "down" ? 0.5 : 1}
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

              {/* Player ID */}
              <text
                x={player.position.x * CELL_SIZE + CELL_SIZE / 2}
                y={player.position.y * CELL_SIZE + CELL_SIZE / 2 + 4}
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
                pointerEvents="none"
              >
                {player.number}
              </text>

              {/* Player status */}
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
          )
        }
      }
      )}
    </>
  );
};

export default ShowPlayersOnField;
