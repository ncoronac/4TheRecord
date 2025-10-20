import { useState } from 'react'

function Form() {
  const [person, setPerson] = useState({
    firstname: "",
    lastname: ""
  })

  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "lastname")
      setPerson({ firstname: person["firstname"], lastname : value});
    else setPerson({ firstname: value, lastname: person["lastname"]})
  }

  // this is just for testing purposes
  function submitForm() {
    console.log("Submitted: ", person)
  }

  return (
    <div className="container">
      <h1>Form in React</h1>
      <form>
        <label htmlFor="firstname">First Name*</label>
        <input type="text" name='firstname' id="firstname" onChange={handleChange}/>

        <label htmlFor="lastname">Last Name*</label>
        <input type="text" name='lastname' id="lastname" onChange={handleChange}/>

        <input type='button' value='Submit' onClick={submitForm}/>
      </form>
    </div>
    
  )
}

export default Form
