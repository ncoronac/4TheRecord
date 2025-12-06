function Icons(props) {
    return (
        <button
            className={`icon-button ${props.isSelected ? "selected" : ""}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Icons;
