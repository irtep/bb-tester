//export type PlayerStatus = 'standing' | 'down' | 'stunned' | 'ko' | 'injured' | 'bench' | 'standby';

// 7 mini, 10 small, 15 medium, 25 big, 
//export type baseSize = number //7 | 10 | 15 | 25;

export interface BloodBowlTeam {
  id: string;
  homeTeam: boolean;
  teamColors: {color1: string, color2: string};
  name: string;
  type: string; // for example human
  rerolls: number;
  players: Player[];
  totalValue: number;
  record: {wins: number, draws: number, touchdowns: number, casualties: number};
  goalsInthisMatch: number;
  casualtiesInThisMatch: number;
};

export interface Player {
  id: string;
  number: number,
  name: string;
  type: string; // for example human lineman
  team: string;
  position: { x: number; y: number };
  ma: number; // Movement Allowance
  st: number; // Strength
  ag: number; // Agility (target number, lower is better)
  pa: number; // passing
  av: number; // Armor Value
  status: string; // string for now, before the gameplay starts to mold...
  hasMoved: boolean;
  hasActed: boolean;
  movementLeft: number;
  blitzesLeft: number;
  skills: string[];
  baseSize: 'very small' | 'small' | 'medium' | 'big';
  value: number;
  injuries: string[];
  holdingBall: boolean;
  onField: boolean;
}

export interface GameState {
  ball: { x: number; y: number } | null;
  ballCarrier: string | null;
  currentTeam: string;
  gamePhase: 'coin toss' | 'decide kicker' | 'deploy defence' | 'deploy offense' | 'game' | 'kick off';
  turn: number;
  half: number;
  score: { home: number; away: number };
  selectedPlayer: string | null;
  validMoves: { x: number; y: number }[];
  actionPhase: 'select_action' | 'movement' | 'block' | 'blitz_movement' | 'pass' | 'handoff' | 'foul' | 'set location' | null;
  log: string[];
  blitzUsed: boolean;
  passUsed: boolean;
  foulUsed: boolean;
  team1: BloodBowlTeam;
  team2: BloodBowlTeam;
}