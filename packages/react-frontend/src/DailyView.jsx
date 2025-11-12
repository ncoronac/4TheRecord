import React, {useState} from "react";
import "./DailyView.css";

function DailyView() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
                    "October", "November", "December"];
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date();

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
        if (currentMonth === 1){
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
                        backgroundColor: isToday ? "#b9aaff" : "transparent",
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
        <h2>{months[currentMonth]} {currentYear}</h2>
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
      </div>

      {/* RIGHT SIDE: Daily Prompts*/}
      <div className="daily-prompts">
        <h1>Daily Prompts</h1>
        <p>coming soon..</p>
      </div>
    </div>
  );
}

export default DailyView;