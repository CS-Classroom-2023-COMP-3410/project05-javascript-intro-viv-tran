const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correct: "Blue Whale"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Mark Twain", "Harper Lee", "Ernest Hemingway", "Jane Austen"],
        correct: "Harper Lee"
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: ["Au", "Ag", "Pb", "Fe"],
        correct: "Au"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let shuffledQuestions = [];

// Initialize quiz
function startQuiz() {
    shuffledQuestions = shuffle(questions);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("result-container").innerHTML = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
    showQuestion();
}

// Shuffle questions order
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Display a question
function showQuestion() {
    let questionData = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-text").textContent = questionData.question;
    document.getElementById("answer-buttons").innerHTML = "";

    questionData.answers.forEach(answer => {
        let li = document.createElement("li");
        li.textContent = answer;
        li.onclick = () => checkAnswer(answer);
        document.getElementById("answer-buttons").appendChild(li);
    });

    document.getElementById("feedback").textContent = "";
}

// Check the selected answer
function checkAnswer(selectedAnswer) {
    let correctAnswer = shuffledQuestions[currentQuestionIndex].correct;
    userAnswers.push({ 
        question: shuffledQuestions[currentQuestionIndex].question,
        selected: selectedAnswer,
        correct: correctAnswer 
    });

    if (selectedAnswer === correctAnswer) {
        document.getElementById("feedback").textContent = "✅ Correct!";
        score++;
    } else {
        document.getElementById("feedback").textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
    }

    document.querySelectorAll("#answer-buttons li").forEach(li => {
        li.onclick = null;
        if (li.textContent === correctAnswer) {
            li.style.background = "#28a745";
            li.style.color = "white";
        } else if (li.textContent === selectedAnswer) {
            li.style.background = "#dc3545";
            li.style.color = "white";
        }
    });

    document.getElementById("next-btn").classList.remove("hidden");
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
        document.getElementById("next-btn").classList.add("hidden");
    } else {
        endQuiz();
    }
}

// Show quiz results
function endQuiz() {
    document.getElementById("question-container").innerHTML = `<h2>Quiz Completed! 🎉</h2><p>Your Score: ${score} / ${questions.length}</p>`;
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("restart-btn").classList.remove("hidden");

    let resultHTML = "<h3>Review Your Answers</h3><ul>";
    userAnswers.forEach(ans => {
        resultHTML += `<li><b>${ans.question}</b><br>
                       Your Answer: ${ans.selected} ${ans.selected === ans.correct ? "✅" : "❌"} <br>
                       Correct Answer: ${ans.correct}</li>`;
    });
    resultHTML += "</ul>";

    document.getElementById("result-container").innerHTML = resultHTML;
}

// Restart the quiz
function restartQuiz() {
    document.getElementById("question-container").innerHTML = `
        <p id="question-text"></p>
        <ul id="answer-buttons"></ul>
        <p id="feedback"></p>`;
    startQuiz();
}

// Start quiz on load
startQuiz();
