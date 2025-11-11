import type { GameState, Player } from "../types/types";

export function getAdjacentOpponents(player: Player, gameState: GameState): Player[] {
  return gameState.players.filter(p =>
    p.team !== player.team &&
    p.status === 'standing' &&
    Math.abs(p.position.x - player.position.x) <= 1 &&
    Math.abs(p.position.y - player.position.y) <= 1 &&
    !(p.position.x === player.position.x && p.position.y === player.position.y)
  );
}

export function getAdjacentDownedOpponents(player: Player, gameState: GameState): Player[] {
  return gameState.players.filter(p =>
    p.team !== player.team &&
    p.status === 'down' &&
    Math.abs(p.position.x - player.position.x) <= 1 &&
    Math.abs(p.position.y - player.position.y) <= 1 &&
    !(p.position.x === player.position.x && p.position.y === player.position.y)
  );
}

export function getAdjacentTeammates(player: Player, gameState: GameState): Player[] {
  return gameState.players.filter(p =>
    p.team === player.team &&
    p.id !== player.id &&
    p.status === 'standing' &&
    Math.abs(p.position.x - player.position.x) <= 1 &&
    Math.abs(p.position.y - player.position.y) <= 1 &&
    !(p.position.x === player.position.x && p.position.y === player.position.y)
  );
}