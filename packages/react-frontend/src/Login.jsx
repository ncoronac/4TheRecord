import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Login(props) {
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        username: "",
        password: "",
    });

    return (
        <div className="form-page">
            <div className="header-group">
                <h2 className="header-group-h2">4TheRecord</h2>
                <h1 className="header-group-h1">Welcome!</h1>
            </div>

            <div className="form-container">
                <form onSubmit={submitForm}>
                    <label htmlFor="username">Username*</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={creds.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password*</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={creds.password}
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

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setCreds({ ...creds, username: value });
                break;
            case "password":
                setCreds({ ...creds, password: value });
                break;
        }
    }

    function submitForm() {
        props.handleSubmit(creds);
        setCreds({ username: "", password: "" });
    }
}

export default Login;
