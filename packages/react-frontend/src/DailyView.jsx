function GuidedPrompts(){

    const guidedPrompts = [
        {id: 1, text: "Write about all of the green things you saw today."},
        {id: 2, text: "What are three good things you noticed about your day?"},
        {id: 3, text: "Tell me about your favorite baking recipe."},
        {id: 4, text: "Pick out your outfit for tomorrow. Come back and describe it in your diary."}
    ];

    function handleClick(text){
        // change current view to diary entry
        // change currentView to diary entry page and have a pop-up w/ the prompt text (with an X to click out of it)
    }

    return (
        
        <div className="prompt-header">
            <h1>Guided Prompts</h1>
            <p>
                Not sure what to write about? Want to uplift your mood?
                Scroll through our guided prompts for a pressure-free writing session.
            </p>

            <div className="prompt-list">
                {guidedPrompts.map((prompt) => (
                    <button type="button" key={prompt.id} onClick={() => handleClick(prompt.text)}>
                        {prompt.text}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default GuidedPrompts;

// return code to what is in here when you push/merge to main
/* function DailyView() {
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <h1>Welcome to the Daily View of 4TheRecord!</h1>
                <p>in progres...</p>
            </div>
        </div>
    )
}

export default DailyView;
*/