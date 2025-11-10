export type Team = 'home' | 'away';
export type PlayerStatus = 'standing' | 'down' | 'stunned' | 'ko' | 'injured';

export interface Player {
  id: string;
  team: Team;
  position: { x: number; y: number };
  ma: number; // Movement Allowance
  st: number; // Strength
  ag: number; // Agility (target number, lower is better)
  av: number; // Armor Value
  status: PlayerStatus;
  hasMoved: boolean;
  hasActed: boolean;
}

export interface GameState {
  players: Player[];
  ball: { x: number; y: number } | null;
  ballCarrier: string | null;
  currentTeam: Team;
  turn: number;
  half: number;
  score: { home: number; away: number };
  selectedPlayer: string | null;
  validMoves: { x: number; y: number }[];
  actionPhase: 'select_action' | 'movement' | 'block' | 'blitz_movement' | 'pass' | 'handoff' | 'foul' | null;
  log: string[];
  blitzUsed: boolean;
  passUsed: boolean;
  foulUsed: boolean;
}