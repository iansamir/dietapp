let AIMode = false;

async function generateTextRequest(prompt) {
    try {
        document.querySelector('#AI-prompt-display').innerHTML = "";
        document.querySelector('#AI-response').innerHTML = "";
        showAILoader();
        const response = await fetch('/openAI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            }),
        });

        if (!response.ok) {
            hideAILoader()
            throw new Error('The server is overloaded. Sorry!');
        }
        const data = await response.json();
        // console.log(data);
        const responseText = data.data;
        document.querySelector('#AI-prompt-display').innerHTML = prompt;
        document.querySelector('#AI-response').innerHTML = responseText;
        document.querySelector('input').value = ""
        hideAILoader()
    } catch (error) {
        document.querySelector('#AI-response').textContent = error;
    }
}

const handleChange = () => {
    if (AIMode) {
        let AIPrompt = document.querySelector('input').value
        generateTextRequest(AIPrompt);
    }
}

const toggleAIMode = () => {
    switch (AIMode) {
        case false:
            document.querySelector('input').style.color = "red";
            document.querySelector('input').placeholder = "AI Mode: ON";
            document.querySelector("#AI-response").style.display = "block";
            document.querySelector("#AI-prompt-display").style.display = "block";
            AIMode = true;
            break;

        case true:
            document.querySelector('input').style.color = "black";
            document.querySelector('input').placeholder = "AI Mode: OFF";
            document.querySelector("#AI-response").style.display = "none";
            document.querySelector("#AI-prompt-display").style.display = "none";
            AIMode = false;
            break;
    }
}

const handleAltKey = (e) => {
    if (e.altKey) {
        e.preventDefault();
        toggleAIMode();
    }
}

const showAILoader = () => {
    document.querySelector('#AI-loader').style.display = "flex";
}

const hideAILoader = () => {
    document.querySelector('#AI-loader').style.display = "none";
}

document.querySelector('input').addEventListener("keydown", handleAltKey);
document.querySelector('input').addEventListener("change", handleChange);