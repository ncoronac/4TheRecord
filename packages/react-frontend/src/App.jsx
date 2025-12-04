import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
    }, [colorTheme]);

    function postUser(person) {
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
    }

    function updateUsers(person) {
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
    }

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

    return (
        <>
            {showNavbar && <Navbar pickColor={toggleTheme} />}
            <Routes>
                <Route
                    path="/"
                    element={<Login handleSubmitPerson={updateUsers} />}
                />
                <Route
                    path="/Form"
                    element={<Form handleSubmitPerson={updateUsers} />}
                />
                <Route path="/DailyView" element={<DailyView />} />
                <Route
                    path="/DiaryEntry"
                    element={
                        <DiaryEntry
                            handleSubmitEntry={updateEntries}
                            colorTheme={colorTheme}
                            // popup={popup}
                            // setPopup={setPopup}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default AppWrapper;
