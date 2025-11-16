import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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
                height: "77px",
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(139, 92, 246, 0.08)",
                borderBottom: "1px solid #f3e8ff",
            }}
        >
            {/* 4TheRecord */}
            <Link to="/DailyView">
                <div
                    style={{
                        position: "absolute",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontWeight: "bold",
                        fontSize: "24px",
                        color: "black",
                    }}
                >
                    4TheRecord
                </div>
            </Link>

            {/* User Profile Menu */}
            <div
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
                ref={menuRef}
            >
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#8b5cf6",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
                        border: "2px solid white",
                    }}
                    onClick={handleProfileClick}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                        e.target.style.boxShadow =
                            "0 4px 12px rgba(139, 92, 246, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow =
                            "0 2px 8px rgba(139, 92, 246, 0.3)";
                    }}
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
                            border: "1px solid #f3e8ff",
                            borderRadius: "8px",
                            minWidth: "200px",
                            zIndex: 1001,
                            boxShadow: "0 10px 25px rgba(139, 92, 246, 0.15)",
                            overflow: "hidden",
                            animation: "slideDown 0.2s ease-out",
                        }}
                    >
                        {/* User Info Header */}
                        <div
                            style={{
                                padding: "12px 16px",
                                borderBottom: "1px solid #f3e8ff",
                                backgroundColor: "#faf5ff",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "600",
                                    color: "#1a202c",
                                    fontSize: "14px",
                                }}
                            >
                                Fake User
                            </div>
                            <div
                                style={{
                                    color: "#718096",
                                    fontSize: "12px",
                                    marginTop: "2px",
                                }}
                            >
                                Fakeuser@example.com
                            </div>
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "#4a5568",
                                fontSize: "14px",
                                borderBottom: "1px solid #f3e8ff",
                            }}
                            onClick={handleChangeProfilePicture}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#faf5ff";
                                e.target.style.color = "#8b5cf6";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#4a5568";
                            }}
                        >
                            <span>👤</span>
                            Change Profile Picture
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "#4a5568",
                                fontSize: "14px",
                                borderBottom: "1px solid #f3e8ff",
                            }}
                            onClick={handleInsights}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#faf5ff";
                                e.target.style.color = "#8b5cf6";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#4a5568";
                            }}
                        >
                            <span>📊</span>
                            Insights
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "#4a5568",
                                fontSize: "14px",
                                borderBottom: "1px solid #f3e8ff",
                            }}
                            onClick={handleSettings}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#faf5ff";
                                e.target.style.color = "#8b5cf6";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#4a5568";
                            }}
                        >
                            <span>⚙️</span>
                            Settings
                        </div>

                        <div
                            style={{
                                padding: "12px 16px",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "#e53e3e",
                                fontSize: "14px",
                            }}
                            onClick={handleLogout}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#fed7d7";
                                e.target.style.color = "#c53030";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#e53e3e";
                            }}
                        >
                            <span>🚪</span>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
