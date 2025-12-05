import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Form(props) {
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        firstname: "",
        lastname: "",
        username: "",
        pwd: "",
        email: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setCreds({ ...creds, username: value });
                break;
            case "password":
                setCreds({ ...creds, pwd: value });
                break;
            case "firstname":
                setCreds({ ...creds, firstname: value });
                break;
            case "lastname":
                setCreds({ ...creds, lastname: value });
                break;

            case "email":
                setCreds({ ...creds, email: value });
        }
    }

    function submitForm(event) {
        event.preventDefault();

        console.log(creds);
        props.handleSubmit(creds);
        setCreds({
            firstname: "",
            lastname: "",
            username: "",
            pwd: "",
            email: "",
        });
        navigate("/");
    }

    return (
        <div className="form-page">
            <div className="header-group">
                <h2 className="header-group-h2">4TheRecord</h2>
                <h1 className="header-group-h1">Welcome!</h1>
            </div>

            <div className="form-container">
                <form onSubmit={submitForm}>
                    <label htmlFor="firstname">First Name*</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={creds.firstname}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="lastname">Last Name*</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={creds.lastname}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="username">Username*</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={creds.username}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="password">Password*</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={creds.pwd}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={creds.email}
                        onChange={handleChange} // triggered when there is any change in the input field
                        required
                    />

                    <button type="submit"> Sign Up</button>
                    <button type="submit">Already a User?</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
