import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ handleSubmitPerson }) {
    const navigate = useNavigate();

    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
    });

    function handleChange(event) {
        const { name, value } = event.target; // const name = event.target.name; const value = event.target.value
        setPerson({ ...person, [name]: value }); // may need to change this to log back into an exising person (instead of create a new person) in the future
    }

    function submitForm(event) {
        event.preventDefault();
        // calls Users(person) which sends POST to backend
        handleSubmitPerson(person);
        setPerson({ firstname: "", lastname: "" });

        // goes to daily view page afterward
        navigate("/DailyView");
    }

    return (
        <div className="form-page">
            <div className="header-group">
                <h2>4TheRecord</h2>
                <h1>Welcome!</h1>
            </div>

            <div className="form-container">
                <form onSubmit={submitForm}>
                    <label htmlFor="username">Username*</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={person.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password*</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={person.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Log in</button>

                    <button type="submit" onClick={() => navigate("/Form")}>
                        New User?
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
