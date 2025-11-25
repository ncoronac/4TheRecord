import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Form from "./Form";
import DiaryEntry from "./DiaryEntry";
import DailyView from "./DailyView";
import Navbar from "./Navbar";

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
    const showNavbar = location.pathname !== "/";

    // const [currentView, setCurrentView] = useState("form");
    const [users, setUsers] = useState([]);
    const [entries, setEntries] = useState([]);
    const [colorTheme, setColorTheme] = useState("purple"); // intial theme is purple

    const toggleTheme = (color) => {
        setColorTheme(color);
        console.log("toggle theme:", color);
    }

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
            {showNavbar && <Navbar pickColor={toggleTheme} colorTheme={colorTheme}/>}
            <Routes>
                <Route
                    path="/"
                    element={<Form handleSubmitPerson={updateUsers} colorTheme={colorTheme}/>}
                />
                <Route path="/DailyView" element={<DailyView colorTheme={colorTheme}/>} />
                <Route
                    path="/DiaryEntry"
                    element={<DiaryEntry handleSubmitEntry={updateEntries} colorTheme={colorTheme}/>}
                />
            </Routes>
        </>
    );
}

export default AppWrapper;
