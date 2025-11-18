import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
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
    const hideOn = ["/", "/Form"]; 
    const showNavbar = !hideOn.includes(location.pathname);

    // const [currentView, setCurrentView] = useState("form");
    const [users, setUsers] = useState([]); // not sure ab this
    const [entries, setEntries] = useState([]);

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            // is this the issue?
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
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
        const promise = fetch("http://localhost:8000/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        });
        return promise;
    }

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path = "/" element = {<Login handleSubmitPerson={updateUsers}/>} />
                <Route
                    path="/Form"
                    element={<Form handleSubmitPerson={updateUsers} />}
                />
                <Route path="/DailyView" element={<DailyView />} />
                <Route
                    path="/DiaryEntry"
                    element={<DiaryEntry handleSubmitEntry={updateEntries} />}
                />
            </Routes>
        </>
    );
}

export default AppWrapper;
