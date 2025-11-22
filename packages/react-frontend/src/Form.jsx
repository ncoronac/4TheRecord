import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Form.css";

function Form({ handleSubmitPerson }) {
    const navigate = useNavigate();

    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
        username: "",
        pwd: "",
        email: "",
    });

    function handleChange(event) {
        const { name, value } = event.target; // const name = event.target.name; const value = event.target.value
        setPerson({ ...person, [name]: value }); // may need to change this to log back into an exising person (instead of create a new person) in the future
    }

    async function submitForm(event) {
        event.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(person),
            });

            if (res.status !== 201) {
                const text = await res.text();
                throw new Error(
                    `Signup failed ${res.status}: ${text || "unknown"}`
                );
            }

            setPerson({
                firstname: "",
                lastname: "",
                username: "",
                pwd: "",
                email: "",
            });

            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="form-page">
            <div className="header-group">
                <h2>4TheRecord</h2>
                <h1>Welcome!</h1>
            </div>

            <div className="form-container">
                <form onSubmit={submitForm}>
                    <label htmlFor="firstname">First Name*</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={person.firstname}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="lastname">Last Name*</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={person.lastname}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="username">Username*</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={person.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="pwd">Password*</label>
                    <input
                        type="password"
                        name="pwd"
                        id="pwd"
                        value={person.pwd}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={person.email}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>
                    <button type="submit" onClick={() => navigate("/")}>
                        Already a User?
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;
