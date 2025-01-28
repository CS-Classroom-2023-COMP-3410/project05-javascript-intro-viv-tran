const animalEmojis = ["🐶", "🐱", "🐰", "🐻", "🐸", "🦊", "🐷", "🐼"];
let cardsArray = [...animalEmojis, ...animalEmojis]; // Double the cards for pairs
let grid = document.querySelector(".grid");
let moveCount = 0;
let timer = 0;
let flippedCards = [];
let matchedPairs = 0;
let interval;

document.getElementById("move-count").textContent = moveCount;
document.getElementById("timer").textContent = timer;

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Start the game
function startGame() {
    grid.innerHTML = "";
    moveCount = 0;
    timer = 0;
    matchedPairs = 0;
    flippedCards = [];
    clearInterval(interval);

    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("timer").textContent = timer;

    let shuffledCards = shuffle(cardsArray);

    shuffledCards.forEach((emoji, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });

    interval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = timer;
    }, 1000);
}

// Flip a card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if two flipped cards match
function checkMatch() {
    moveCount++;
    document.getElementById("move-count").textContent = moveCount;

    let [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        flippedCards = [];
        
        if (matchedPairs === animalEmojis.length) {
            clearInterval(interval);
            setTimeout(() => alert(`🎉 You won in ${moveCount} moves and ${timer} seconds!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 800);
    }
}

// Restart the game
function restartGame() {
    startGame();
}

// Start the game initially
startGame();
