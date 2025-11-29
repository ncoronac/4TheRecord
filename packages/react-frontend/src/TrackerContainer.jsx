import Icons from "./Icons";

function TrackerContainer(props) {
    return (
        <div className="tracker-container">
            <h3>{props.title}</h3>
            <div className="icon-row">
                {props.icons.map((icon, index) => (
                    <Icons
                        key={index}
                        text={icon.text}
                        num={icon.num}
                        colorTheme={props.colorTheme}
                    />
                ))}
            </div>
        </div>
    );
}

export default TrackerContainer;
