import type { Player } from "../types/types";

export const defaultPlayer : Player = {
    id: 'default0',
    number: 0,
    name: 'default Guy',
    type: 'human linesman',
    team: 'default team',
    position: {x: 0, y: 0},
    ma: 6,
    st: 3,
    ag: 3,
    pa: 4,
    av: 8,
    status: 'on bench',
    hasMoved: false,
    hasActed: false,
    movementLeft: 6,
    rushesLeft: 2,
    skills: [],
    baseSize: 'medium', // very small, small, medium, big
    value: 40000,
    injuries: [],
    holdingBall: false,
    onField: false
};