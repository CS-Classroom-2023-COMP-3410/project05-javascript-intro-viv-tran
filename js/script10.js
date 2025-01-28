const promptText = document.getElementById("prompt-text");
const userInput = document.getElementById("user-input");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const easyWords = ["apple", "orange", "house", "table", "chair", "flower", "sun", "moon"];
const mediumWords = ["developer", "keyboard", "strategy", "harmony", "optimize", "reliable"];
const hardSentences = [
    "Hello, world! How's your day going?",
    "JavaScript makes web development fun & interactive.",
    "Coding: a skill that blends logic, creativity, and patience!"
];

let startTime, errors, totalCharsTyped, currentPrompt, typingActive = false;

function getRandomPrompt(difficulty) {
    if (difficulty === "easy") {
        return Array.from({ length: 5 }, () => easyWords[Math.floor(Math.random() * easyWords.length)]).join(" ");
    } else if (difficulty === "medium") {
        return Array.from({ length: 3 }, () => mediumWords[Math.floor(Math.random() * mediumWords.length)]).join(" ");
    } else {
        return hardSentences[Math.floor(Math.random() * hardSentences.length)];
    }
}

function displayPrompt() {
    promptText.innerHTML = "";
    currentPrompt.split("").forEach(char => {
        let span = document.createElement("span");
        span.textContent = char;
        promptText.appendChild(span);
    });
}

function startTrainer() {
    currentPrompt = getRandomPrompt(difficultySelect.value);
    displayPrompt();
    userInput.value = "";
    errors = 0;
    totalCharsTyped = 0;
    typingActive = true;
    startTime = new Date().getTime();
    userInput.focus();
}

function updateStats() {
    const elapsedTime = (new Date().getTime() - startTime) / 60000;
    const wordsTyped = userInput.value.trim().split(/\s+/).length;
    const wpm = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    const accuracy = totalCharsTyped > 0 ? Math.round(((totalCharsTyped - errors) / totalCharsTyped) * 100) : 100;
    accuracyDisplay.textContent = accuracy + "%";
}

function checkTyping() {
    if (!typingActive) return;

    const userText = userInput.value;
    const spans = promptText.querySelectorAll("span");
    totalCharsTyped++;

    for (let i = 0; i < spans.length; i++) {
        if (i < userText.length) {
            if (userText[i] === currentPrompt[i]) {
                spans[i].classList.add("correct");
                spans[i].classList.remove("incorrect");
            } else {
                spans[i].classList.add("incorrect");
                spans[i].classList.remove("correct");
                errors++;
            }
        } else {
            spans[i].classList.remove("correct", "incorrect");
        }
    }

    updateStats();

    if (userText === currentPrompt) {
        typingActive = false;
        alert("Well done! Test complete.");
    }
}

function restartTrainer() {
    typingActive = false;
    promptText.innerHTML = "Press 'Start' to begin a new session.";
    userInput.value = "";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
}

startButton.addEventListener("click", startTrainer);
userInput.addEventListener("input", checkTyping);
restartButton.addEventListener("click", restartTrainer);
