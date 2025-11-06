function Navbar({ currentView, setCurrentView }) {
    const linkStyle = (view) => ({
        padding: "10px 20px",
        cursor: "pointer",
        color: currentView === view ? "#4299e1" : "black",
        fontWeight: currentView === view ? "bold" : "normal"
    });

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                backgroundColor: "white",
                padding: "15px 0",
                position: "sticky",
                top: 0,
                width: "100%",
                zIndex: 1000
            }}
        >
            <span style={linkStyle("form")} onClick={() => setCurrentView("form")}>
                User Sign-Up
            </span>

            <span style={linkStyle("diary")} onClick={() => setCurrentView("diary")}>
                Diary Entry
            </span>

            <span style={linkStyle("dailyview")} onClick={() => setCurrentView("dailyview")}>
                Daily View
            </span>
        </nav>
    );
}

export default Navbar;
