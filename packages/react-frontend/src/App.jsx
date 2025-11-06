import { useState } from "react";
import Form from "./Form";
import DiaryEntry from "./DiaryEntry";
import DailyView from "./DailyView";
import Navbar from "./Navbar";

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
        console.log("in updateUsers");
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

    return (
        <div className="App">
            <Navbar currentView={currentView} setCurrentView={setCurrentView} />
            
            {currentView === "form" && <Form handleSubmit={updateUsers} />}
            {currentView === "diary" && <DiaryEntry />}
            {currentView === "dailyview" && <DailyView />}
        </div>
    );
}

export default App;
