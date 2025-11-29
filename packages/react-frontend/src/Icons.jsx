// import React, { useState } from 'react';

function Icons(props) {

    function handleClick(event) {
        event.preventDefault();
        console.log("Submitted: ", props.text, props.num);
    }

    return (
        <button className="icon-button" onClick={handleClick}>
            {props.text}
        </button>
    );
}

export default Icons;
