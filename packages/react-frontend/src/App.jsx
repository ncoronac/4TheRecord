import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "./Form";
import DiaryEntry from "./DiaryEntry";
import DailyView from "./DailyView";
import Navbar from "./Navbar";
import Login from "./Login";
// wrapper that allows us to conditionally render the navbar
function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

function App() {
    const navigate = useNavigate();
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");

    // used to get the current page for conditional rendering
    const location = useLocation();
    const showNavbar =
        location.pathname !== "/" && location.pathname !== "/Form";

    // const [currentView, setCurrentView] = useState("form");
    const [users, setUsers] = useState([]);
    const [entries, setEntries] = useState([]);
    const [colorTheme, setColorTheme] = useState("purple"); // intial theme is purple

    // called when a button is pressed in the dropdown menu, updates state of colorTheme variable
    const toggleTheme = (color) => {
        setColorTheme(color);
    };

    // occurs when state colorTheme var is changed
    useEffect(() => {
        console.log(message);

        function addAuthHeader(otherHeaders = {}) {
            if (token === INVALID_TOKEN) {
                return otherHeaders;
            } else {
                return {
                    ...otherHeaders,
                    Authorization: `Bearer ${token}`,
                };
            }
        }

        function fetchUsers() {
            const promise = fetch(`http://localhost:8000/users/`, {
                headers: addAuthHeader(),
            });

            return promise;
        }

        fetchUsers()
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((json) => {
                if (json) {
                    setUsers(json[users]);
                } else {
                    setUsers(null);
                }
            }).catch;

        // maps each colorTheme to a css file
        const themeMap = {
            purple: "/themes/purple.css",
            pink: "/themes/pink.css",
            blue: "/themes/blue.css",
            green: "/themes/green.css",
            yellow: "/themes/yellow.css",
        };

        // grabs the current "theme-css" link from index.html
        const link = document.getElementById("theme-css");
        if (link) {
            link.href = themeMap[colorTheme]; // changes the file path in the "theme-css" link to the selected colorTheme
        }
    }, [colorTheme, users, token, message]);

    /*function postUser(person) {
        const promise = fetch(
            "https://4therecord-dycbdgaxc8cvdpb3.westus-01.azurewebsites.net/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(person),
            }
        );
        return promise;
    } */

    /*function updateUsers(person) {
        postUser(person)
            .then((res) => {
                if (res.status == 201) {
                    res.json().then((res) => {
                        setUsers([...users, res]); // not sure ab this
                    });
                } else {
                    console.log("wrong status code: ", res.status);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } */

    function updateEntries(entry) {
        postEntry(entry)
            .then((res) => {
                if (res.status == 201) {
                    // if post is successful
                    res.json().then((res) => {
                        setEntries([...entries, res]);
                    });
                } else {
                    console.log("wrong status code: ", res.status);
                }
            })
            .catch((error) => console.log(error));
    }

    function postEntry(entry) {
        const promise = fetch(
            "https://4therecord-dycbdgaxc8cvdpb3.westus-01.azurewebsites.net/entries",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            }
        );
        return promise;
    }
    function loginUser(creds) {
        const promise = fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((payload) => setToken(payload.token));
                    setMessage(`Login successful; auth token saved`);
                    navigate("/DailyView");
                } else {
                    setMessage(
                        `Login Error ${response.status}: ${response.data}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Login Error: ${error}`);
            });

        return promise;
    }

    function signupUser(creds) {
        console.log("In signupuser");
        console.log(creds);
        const promise = fetch(`http://localhost:8000/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
        })
            .then((response) => {
                if (response.status === 201) {
                    response.json().then((payload) => setToken(payload.token));
                    setMessage(
                        `Signup successful for user: ${creds.username}; auth token saved`
                    );
                } else {
                    setMessage(
                        `Signup Error ${response.status}: ${response.data}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Signup Error: ${error}`);
            });

        return promise;
    }

    return (
        <>
            {showNavbar && <Navbar pickColor={toggleTheme} />}
            <Routes>
                <Route path="/" element={<Login handleSubmit={loginUser} />} />
                <Route
                    path="/Form"
                    element={<Form handleSubmit={signupUser} />}
                />
                <Route path="/DailyView" element={<DailyView />} />
                <Route
                    path="/DiaryEntry"
                    element={
                        <DiaryEntry
                            handleSubmitEntry={updateEntries}
                            colorTheme={colorTheme}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default AppWrapper;
