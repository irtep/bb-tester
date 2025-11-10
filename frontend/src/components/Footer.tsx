import React from 'react';

const Footer: React.FC = (): React.ReactElement => {

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            color: "rgb(0,0,80)",
            borderRadius: 2,
            margin: 1,
            padding: 1
        }}>
            <div>
                Version: 0.0.0
            </div>
        </div>
    );
}

export default Footer;