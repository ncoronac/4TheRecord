import Icons from "./Icons";
import "./Icons.css";

const TrackerContainer = ({ title, icons }) => {
    return (
        <div className="tracker-container">
            <h3>{title}</h3>
            <div className="icon-row">
                {icons.map((icon, index) => (
                    <Icons key={index} text={icon.text} num={icon.num} />
                ))}
            </div>
        </div>
    );
};

export default TrackerContainer;
