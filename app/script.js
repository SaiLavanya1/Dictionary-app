document.getElementById("searchBtn").addEventListener("click", speakWord);

function speakWord() {
    const word = document.getElementById("searchInput").value.trim();
    if (word !== '') {
        fetchDefinition(word);
    }
}

function fetchDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
        if (data.title === "No Definitions Found") {
            document.getElementById("definition").innerHTML = "No definitions found for this word.";
        } else {
            const definition = data[0].meanings[0].definitions[0].definition;
            document.getElementById("definition").innerHTML = `<strong>${word}</strong>: ${definition}`;
            speak(word);
        }
    })
    .catch(error => {
        console.error("Error fetching definition:", error);
        document.getElementById("definition").innerHTML = "An error occurred while fetching the definition.";
    });
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}
