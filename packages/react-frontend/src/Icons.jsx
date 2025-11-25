// import React, { useState } from 'react';
// import "./Icons.css";

function Icons(props) {
    async function loadCSS() {
        if (props.colorTheme == "purple") {
            await import("./PurpleTheme.css");
        }
    }
    loadCSS();

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
