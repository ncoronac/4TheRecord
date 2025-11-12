import { useState, useRef, useEffect } from 'react';

function Navbar({ currentView, setCurrentView }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const linkStyle = (view) => ({
        padding: "10px 20px",
        cursor: "pointer",
        color: currentView === view ? "#4299e1" : "black",
        fontWeight: currentView === view ? "bold" : "normal"
    });

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        setIsMenuOpen(false);
    };

    const handleChangeProfilePicture = () => {
        console.log("Changing profile picture...");
        setIsMenuOpen(false);
    };

    const handleInsights = () => {
        console.log("Opening insights...");
        setIsMenuOpen(false);
    };

    const handleSettings = () => {
        console.log("Opening settings...");
        setIsMenuOpen(false);
    };

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
            {/* 4TheRecord */}
            <div style={{ 
                position: "absolute", 
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#4299e1"
            }}>
                4TheRecord
            </div>

            <span style={linkStyle("form")} onClick={() => setCurrentView("form")}>
                User Sign-Up
            </span>

            <span style={linkStyle("diary")} onClick={() => setCurrentView("diary")}>
                Diary Entry
            </span>

            <span style={linkStyle("dailyview")} onClick={() => setCurrentView("dailyview")}>
                Daily View
            </span>

            {/* User Profile Menu - Right Corner */}
            <div style={{ 
                position: "absolute", 
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)"
            }} ref={menuRef}>
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#4299e1",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px"
                    }}
                    onClick={handleProfileClick}
                >
                    U
                </div>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "45px",
                            right: "0",
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            minWidth: "180px",
                            zIndex: 1001
                        }}
                    >
                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee"
                            }}
                            onClick={handleChangeProfilePicture}
                        >
                            Change Profile Picture
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee"
                            }}
                            onClick={handleInsights}
                        >
                            Insights
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee"
                            }}
                            onClick={handleSettings}
                        >
                            Settings
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                color: "#e53e3e"
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;