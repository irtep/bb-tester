import React from "react";
import type { BloodBowlTeam, Player } from "../types/types";

interface BenchProps {
    team: BloodBowlTeam;
}

const Bench: React.FC<BenchProps> = ({ team }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: '0.5rem'
        }}>

            <h2 style={{
                fontWeight: 'bold',
                fontSize: '1.125rem',
                color: '#1d4ed8',
                marginBottom: '0.5rem'
            }}>
                {team.name}
            </h2>

            {team.players.map((p: Player) => (
                <div
                    key={`homeTeam ${p.id}`}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        width: '5rem',
                        backgroundColor: p.status === 'down' ? '#4b5563' : p.status === 'stunned' ?
                            '#ca8a04' :
                            '#1d4ed8'
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
                </div>
            ))}
        </div>
    );
};

export default Bench;
