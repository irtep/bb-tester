import type { Player } from "../types/types";

export const defaultPlayer : Player = {
    id: 'default0',
    name: 'default Guy',
    type: 'human linesman',
    team: 'default team',
    position: {x: 0, y: 0},
    ma: 6,
    st: 3,
    ag: 3,
    pa: 4,
    av: 8,
    status: 'standby',
    hasMoved: false,
    hasActed: false,
    movementLeft: 6,
    blitzesLeft: 2,
    skills: [],
    baseSize: 15, // 7 mini, 10 small, 15 medium, 25 big, 
    value: 40000,
    injuries: [],
    holdingBall: false
};