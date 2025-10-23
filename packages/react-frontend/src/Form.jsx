import { useState } from "react";

function Form() {
    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setPerson({ ...person, [name]: value });
    }

    // this is just for testing purposes
    function submitForm(event) {
        event.preventDefault();
        console.log("Submitted: ", person);
    }

    return (
        <div className="container">
            <h1>User Sign-Up</h1>
            <form onSubmit={submitForm}>
                <label htmlFor="firstname">First Name*</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={person.firstname}
                    onChange={handleChange}
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

                <label htmlFor="email">Email*</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={person.email}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
