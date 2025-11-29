import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DailyView(props) {
    /* async function loadCSS() {
        if (props.colorTheme == "purple") {
            await import("./PurpleTheme.css").then(console.log("updating theme to ", props.colorTheme));
        } else if (props.colorTheme == "pink") {
            await import("./PinkTheme.css").then(console.log("updating theme"));
        }
    }
    loadCSS(); 

    useEffect(() => {
        // these are all purple and pink for now while i work, they will later be different css files
        /* async function loadCSS(){
            console.log(document.querySelectorAll('*'));
            const stylesList = document.getElementsByTagName("style");
            console.log("stylesList: ", stylesList);
            const index = stylesList.length - 1;
            console.log(index, stylesList.item(index));
            document.removeChild(Node(stylesList.item(index)));
            console.log("stylesList: ", stylesList);
            if (props.colorTheme == "purple") {
                await import("./PurpleTheme.css");
            } else if (props.colorTheme == "pink") {
                await import("./PinkTheme.css");
            } else if (props.colorTheme == "blue") {
                await import("./PurpleTheme.css");
            } else if (props.colorTheme == "green") {
                await import("./PurpleTheme.css");
            } else if (props.colorTheme == "yellow") {
                await import("./PurpleTheme.css");
            }
        }
        loadCSS();
    }, [props.colorTheme]); */ 


    /*
    useEffect(() => {
        const themeMap = {
            purple: "/themes/purple.css",
            pink: "/themes/pink.css",
            blue: "/themes/blue.css",
            green: "/themes/green.css",
            yellow: "/themes/yellow.css",
        };

        const link = document.getElementById("theme-css");
        console.log(link);
        if (link) {
            link.href = themeMap[props.colorTheme];
        }

        console.log(document.getElementsByTagName("link"));

    }, [props.colorTheme]); */


    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const today = new Date();

    // list of guided prompts
    const guidedPrompts = [
        {
            id: 1,
            text: "Write about all of the green things you saw today ── .✦",
        },
        {
            id: 2,
            text: "What are three good things you noticed about your day? ➔",
        },
        { id: 3, text: "Tell me about your favorite baking recipe. ── .✦" },
        {
            id: 4,
            text: "Pick out your outfit for tomorrow. Come back and describe it in your diary. ➔",
        },
    ];

    function handleClick(prompt) {
        // dummy function; just exists to pass eslint checks, will add real functionality later
        return prompt;
    }

    // State: current month & year
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    function daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    function previousMonth() {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const totalDays = daysInMonth(currentMonth, currentYear);

        const weeks = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const daysInWeek = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    daysInWeek.push(<td key={j}></td>);
                } else if (day > totalDays) {
                    daysInWeek.push(<td key={j}></td>);
                } else {
                    const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                    daysInWeek.push(
                        <td
                            key={j}
                            style={{
                                padding: "6px",
                                textAlign: "center",
                                backgroundColor: isToday
                                    ? "#b9aaff"
                                    : "transparent",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                            }}
                        >
                            {day}
                        </td>
                    );
                    day++;
                }
            }
            weeks.push(<tr key={i}>{daysInWeek}</tr>);
        }
        return weeks;
    }
    return (
        <div className="daily-view-container">
            {/* LEFT SIDE: Calendar */}
            <div className="calendar-section">
                <h1>Calendar</h1>
                <h2>
                    {months[currentMonth]} {currentYear}
                </h2>
                <div className="nav-buttons">
                    <button onClick={previousMonth}>Previous</button>
                    <button onClick={nextMonth}>Next</button>
                </div>

                <table className="calendar-table">
                    <thead>
                        <tr>
                            {days.map((d) => (
                                <th key={d}>{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{renderCalendar()}</tbody>
                </table>

                {/* added this for now since calendar is not clickable (just to get rid of the navbar) */}
                <Link to="/DiaryEntry">
                    <button>Diary Entry</button>
                </Link>
            </div>

            {/* RIGHT SIDE: Daily Prompts*/}
            <div className="daily-prompts">
                <h1>Daily Prompts</h1>
                <p>
                    Not sure what to write about? Want to uplift your mood?
                    Scroll through our guided prompts for a pressure-free
                    writing session.
                </p>

                <div className="prompt-list">
                    {guidedPrompts.map((prompt) => (
                        <button
                            type="button"
                            key={prompt.id}
                            onClick={() => handleClick(prompt.text)}
                        >
                            {prompt.text}
                        </button>
                    ))}
                </div>
                <p>interactivity coming soon...</p>
            </div>
        </div>
    );
}

export default DailyView;
