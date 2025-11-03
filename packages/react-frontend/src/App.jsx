import { useState } from "react";
import Form from "./Form";
import DiaryEntry from "./DiaryEntry";

function App() {
    const [currentView, setCurrentView] = useState("form");
    const [users, setUsers] = useState([ ]); // not sure ab this

    // don't actually need this rn since we aren't doing a GET request on users
    function fetchUsers(){
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person){
        const promise = fetch("http://localhost:8000/users", { // is this the issue?
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });
        return promise;
    }

    function updateUsers(person){
        console.log("in updateUsers"); // for testing, can remove later
        postUser(person).then((res) => {
            if (res.status == 201) {
                res.json().then((res) => { 
                    setUsers([...users, res]) // not sure ab this
                });
            } else { console.log("wrong status code: ", res.status) } 
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateEntries(entry){
        postEntry(entry).then((res) => {
            if (res.status == 201) {
                res.json().then((res) => {
                    setEntries([...entries, res])
                });
            } else { console.log("wrong status code: ", res.status) }
        }).catch((error) => console.log(error) );
    }

    function postEntry(entry){
        const promise = fetch("http://localhost:8000/entries", { // is this the issue?
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });
        return promise;
    }

    return (
        <div className="App">
            <nav style={{ marginBottom: "30px", textAlign: "center" }}>
                <button
                    onClick={() => setCurrentView("form")}
                    style={{
                        margin: "0 10px",
                        padding: "10px 20px",
                        backgroundColor:
                            currentView === "form" ? "#4299e1" : "#e2e8f0",
                        color: currentView === "form" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    User Sign-Up
                </button>
                <button
                    onClick={() => setCurrentView("diary")}
                    style={{
                        margin: "0 10px",
                        padding: "10px 20px",
                        backgroundColor:
                            currentView === "diary" ? "#4299e1" : "#e2e8f0",
                        color: currentView === "diary" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Diary Entry
                </button>
            </nav>

            {currentView === "form" ? <Form handleSubmitPerson={updateUsers} /> : <DiaryEntry handleSubmit={updateEntries}/>}
        </div>
    );
}

export default App;
