/*
export interface BloodBowlTeam {
  id: string;
  name: string;
  type: string; // for example human
  rerolls: number;
  players: Player[];
  totalValue: number;
  record: {wins: number, draws: number, touchdowns: number, casualties: number}
};
*/

import { defaultPlayer } from "../players/players";
import type { BloodBowlTeam } from "../types/types";

export const sampleTeams: BloodBowlTeam[] = [
    {
        id: 'example1',
        name: 'Super Team 1',
        type: 'human',
        rerolls: 2,
        players: [
            defaultPlayer,
            { ...defaultPlayer, id: "2", name: 'strongie', st: 4, skills: ['block', 'pro'] },
            { ...defaultPlayer, id: "3", name: 'quckie', ma: 7, ag: 3 },
            { ...defaultPlayer, id: "4" },
            { ...defaultPlayer, id: "5" },
            { ...defaultPlayer, id: "5x" },
            { ...defaultPlayer, id: "5y" },
            { ...defaultPlayer, id: "5z" },
            { ...defaultPlayer, id: "5b" },

        ],
        totalValue: 100000,
        record: {
            wins: 0, draws: 0, touchdowns: 0, casualties: 0
        },
        goalsInthisMatch: 0,
        casualtiesInThisMatch: 0
    },
    {
        id: 'example2',
        name: 'Excellent team',
        type: 'human',
        rerolls: 2,
        players: [
            { ...defaultPlayer, id: "6", name: 'Huge Man', st: 5, ag: 5, baseSize: 25 }, { ...defaultPlayer, id: "7" }, { ...defaultPlayer, id: "8", name: 'little', st: 2, ag: 2, baseSize: 10 }, { ...defaultPlayer, id: "9" }, { ...defaultPlayer, id: "10" }
        ],
        totalValue: 100000,
        record: {
            wins: 0, draws: 0, touchdowns: 0, casualties: 0
        },
        goalsInthisMatch: 0,
        casualtiesInThisMatch: 0
    }
];