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
        homeTeam: true,
        name: 'Super Team 1',
        teamColors: {color1: 'blue', color2: 'white'},
        type: 'human',
        rerolls: 2,
        players: [
            defaultPlayer,
            { ...defaultPlayer, id: "2", name: 'strongie', st: 4, skills: ['block', 'pro'], team:  'Super Team 1', number: 1},
            { ...defaultPlayer, id: "3", name: 'quckie', ma: 7, ag: 3, team:  'Super Team 1', number: 2 },
            { ...defaultPlayer, id: "4", team:  'Super Team 1', number: 3 },
            { ...defaultPlayer, id: "5", team:  'Super Team 1', number: 4 },
            { ...defaultPlayer, id: "5x", team:  'Super Team 1', number: 5 },
            { ...defaultPlayer, id: "5y", team:  'Super Team 1', number: 6 },
            { ...defaultPlayer, id: "5z", team:  'Super Team 1', number: 7 },
            { ...defaultPlayer, id: "5b", team:  'Super Team 1', number: 8 },
            { ...defaultPlayer, id: "5bx", name:  'snotling', team:  'Super Team 1',number: 9, baseSize: 'very small' },
            { ...defaultPlayer, id: "5bx2", name:  'gobbo', team:  'Super Team 1',number: 10, baseSize: 'small' },
            { ...defaultPlayer, id: "5bx23", name:  'humanie', team:  'Super Team 1',number: 11, baseSize: 'medium' },
            { ...defaultPlayer, id: "5bx2cc3", name:  'ogreboy', team:  'Super Team 1',number: 12, baseSize: 'big' },

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
        homeTeam: false,
        name: 'Excellent team',
        teamColors: {color1: 'darkRed', color2: 'rgb(179, 179, 179)'},
        type: 'human',
        rerolls: 2,
        players: [
            { ...defaultPlayer, id: "6",name: 'Huge Man', st: 5, ag: 5, baseSize: 'big', team: 'Excellent team', number: 1},
                { ...defaultPlayer, id: "7", team: 'Excellent team', number: 2 },
                { ...defaultPlayer, id: "8", name: 'little', st: 2, ag: 2, baseSize: 'small', team: 'Excellent team', number: 3 },
                { ...defaultPlayer, id: "9", team: 'Excellent team', number: 5 },
                { ...defaultPlayer, id: "10sadf", team: 'Excellent team', number: 7 },
                { ...defaultPlayer, id: "1033", team: 'Excellent team', number: 8 },
                { ...defaultPlayer, id: "1044", team: 'Excellent team', number: 71 },
                { ...defaultPlayer, id: "1055", team: 'Excellent team', number: 73 },
                { ...defaultPlayer, id: "1066", team: 'Excellent team', number: 45 },
                { ...defaultPlayer, id: "1077", team: 'Excellent team', number: 72 },
                { ...defaultPlayer, id: "1088", team: 'Excellent team', number: 76 }
        ],
        totalValue: 100000,
        record: {
            wins: 0, draws: 0, touchdowns: 0, casualties: 0
        },
        goalsInthisMatch: 0,
        casualtiesInThisMatch: 0
    }
];