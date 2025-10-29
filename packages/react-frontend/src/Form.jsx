import { useState } from "react";

function Form() {
    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });

    function handleChange(event) {
        const { name, value } = event.target; // const name = event.target.name; const value = event.target.value
        setPerson({ ...person, [name]: value }); // may need to change this to log back into an exising person (instead of create a new person) in the future
    }

    /* // this is just for testing purposes:
    function submitForm(event) {
        event.preventDefault();
        console.log("Submitted: ", person);
    } */ 

    function submitForm(){
        props.handleSubmit(person); // this calls updateUsers(person) which sends a POST to the backend
        setPerson({firstname: "", lastname: "", email: ""});
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
                    onChange={handleChange} // triggered when there is any change in the input field
                    required
                />

                <label htmlFor="lastname">Last Name*</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={person.lastname}
                    onChange={handleChange} // triggered when there is any change in the input field
                    required
                />

                <label htmlFor="email">Email*</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={person.email}
                    onChange={handleChange} // triggered when there is any change in the input field
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;
