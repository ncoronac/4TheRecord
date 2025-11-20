import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Form.css";

function Login({ handleSubmitPerson }) {
    const navigate = useNavigate();
    const [creds, setCreds] = useState({username: "", pwd: ""});
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
        case "username":
            setCreds({ ...creds, username: value });
            break;
        case "pwd":
            setCreds({ ...creds, pwd: value });
            break;
        }
  }
    function loginUser(creds) {
        const promise = fetch(`${API_PREFIX}/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then((response) => {
            if (response.status === 200) {
                response
                .json()
                .then((payload) => setToken(payload.token));
                setMessage(`Login successful; auth token saved`);
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

    function submitForm(e) {
        e.preventDefault();
        setMessage("")
        setSubmitting(true)
        handleSubmit(creds);
        setCreds({username: "", pwd: ""});
    }

    function fetchUsers() {
        return fetch("http://localhost:8000/users");
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
                        value={creds.username}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="pwd">Password*</label>
                    <input
                        type="password"
                        name="pwd"
                        id="pwd"
                        value={creds.pwd}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <button type="submit">Log in</button>

                    <button type = "button" onClick={() => navigate("/Form")}>
                    New User? 
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;
