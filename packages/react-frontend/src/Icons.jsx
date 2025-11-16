//import React, { useState } from 'react';
import "./Icons.css";

function Icons({ text, num }) {
    function handleClick(event) {
        event.preventDefault();
        console.log("Submitted: ", text, num);
    }

    return (
        <button className="icon-button" onClick={handleClick}>
            {text}
        </button>
    );
}

export default Icons;
