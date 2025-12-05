import { useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {
    // get props from App.jsx
    const currentUser = props.currentUser;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const colorButtons = [
        { color: "purple", hex: "#cec1ffff" },
        { color: "pink", hex: "#f5d4f7ff" },
        { color: "blue", hex: "#b1dbfa" },
        { color: "green", hex: "#c3e6c5" },
        { color: "yellow", hex: "#f7efb2" },
    ];

    const handleProfileClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("currentUser");
        props.setCurrentUser(null);    // update App state
        setIsMenuOpen(false);
        navigate("/");
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

    const handleColorChange = (button) => {
        props.pickColor(button.color); // updates state of colorTheme w/ useState
    };

    return (
        <nav className="navbar-box">
            {/* 4TheRecord */}
            <Link to="/DailyView">
                <div className="navbar-title">4TheRecord</div>
            </Link>
    
            {/* User Profile Menu */}
            <div className="navbar-menu" ref={menuRef}>
                <div className="navbar-circle" onClick={handleProfileClick}>
                    {currentUser?.firstname?.[0]?.toUpperCase() || "U"}
                </div>
    
                {isMenuOpen && (
                    <div className="navbar-dropdownmenu">
                        {/* User Info */}
                        <div className="navbar-userinfo-box">
                            <div className="navbar-userinfo-name">
                                {currentUser
                                    ? `${currentUser.firstname || currentUser.username || "User"} ${currentUser.lastname || ""}`
                                    : "Guest"}
                            </div>
                            <div className="navbar-userinfo-email">
                                {currentUser?.email || currentUser?.username || "No email"}
                            </div>
                        </div>
    
                        {/* Dropdown Actions */}
                        <div className="navbar-dropdown-item" onClick={handleChangeProfilePicture}>
                            <span>👤</span> Change Profile Picture
                        </div>
                        <div className="navbar-dropdown-item" onClick={handleInsights}>
                            <span>📊</span> Insights
                        </div>
                        <div className="navbar-dropdown-item" onClick={handleSettings}>
                            <span>⚙️</span> Settings
                        </div>
    
                        {/* Color Picker */}
                        <div className="color-buttons-row">
                            {colorButtons.map((button) => (
                                <button
                                    className="color-buttons"
                                    style={{ backgroundColor: button.hex }}
                                    key={button.color}
                                    onClick={() => handleColorChange(button)}
                                />
                            ))}
                        </div>
    
                        {/* Logout */}
                        <div className="navbar-logout" onClick={handleLogout}>
                            <span>🚪</span> Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
    
}
export default Navbar;
