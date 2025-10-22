import React from "react";
import ReactDOMClient from "react-dom/client";
import App from './App.jsx'
import "./main.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Render the App component which should contain both Form and DiaryEntry
root.render(<App />);