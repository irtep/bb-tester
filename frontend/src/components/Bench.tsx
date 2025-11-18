import React from "react";
import type { BloodBowlTeam, Player } from "../types/types";
import { useGame } from "../context/GameContext";

interface BenchProps {
    team: BloodBowlTeam;
}

const Bench: React.FC<BenchProps> = ({ team }) => {
    const { gameState, setGameState } = useGame();

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: '0.5rem'
        }}>

            <h2 style={{
                fontWeight: 'bold',
                fontSize: '1.125rem',
                background: team.teamColors.color1,
                color: team.teamColors.color2,
                marginBottom: '0.5rem'
            }}>
                {team.name}
            </h2>

            {team.players.map((p: Player) => {
                if (p.status === 'on bench') {
                    return (
                        <div
                            key={`teamAtBench ${p.id}`}
                            style={{
                                padding: '0.5rem',
                                borderRadius: '0.25rem',
                                color: team.teamColors.color2,
                                fontSize: '0.875rem',
                                textAlign: 'center',
                                width: '5rem',
                                backgroundColor: team.teamColors.color1
                            }}
                        >
                            <div>{`#${p.number} ${p.name}`}</div>
                            <div style={{ fontSize: "0.75rem" }}>
                                {`MA ${p.ma}, ST ${p.st}, AG ${p.ag}, PA ${p.pa}, AV ${p.av}`}
                            </div>
                            <div style={{ fontSize: "0.75rem" }}>
                                {p.skills.map((s, i) => (
                                    <div key={i}>{s}</div>
                                ))}
                            </div>
                            <div>{p.status}</div>
                            {
                                (gameState.currentTeam === team.name && (gameState.gamePhase === 'deploy defence' ||  gameState.gamePhase === 'deploy offense') && gameState.selectedPlayer !== p.id) ?
                                    <button
                                        onClick={() => {
                                            setGameState(prev => ({
                                                ...prev,
                                                selectedPlayer: p.id,
                                                validMoves: [],
                                                actionPhase: 'set location'
                                            }));
                                        }}
                                    >deploy</button> :
                                    <></>
                            }
                            {
                                (gameState.selectedPlayer === p.id) ?
                                    <div style={{ color: 'rgb(10,255,0)' }}>selected</div> :
                                    <></>
                            }
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default Bench;
