

const Header: React.FC = (): React.ReactElement => {

    return (
        <div style={{
            background: "rgba(80, 80, 90, 1)",
            backgroundImage: "darkBlue",
            color: "yellow",
            borderRadius: 2,
            margin: 1,
            textAlign: "center",
            width: "100vw"
        }}>
            <div>
                IZ
                <span style={{ color: "gold" }}>
                    Blood bowl
                </span>
            </div>

        </div>
    );
}

export default Header;