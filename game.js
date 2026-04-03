// Memories APK - Game with 60s Timer + Auto Restart

const grid = document.getElementById("memories-grid");
const restartBtn = document.getElementById("memories-restart");
const timerNumber = document.getElementById("timer-number");

let items = ["🍎","🍎","🔥","🔥","⭐","⭐","🎵","🎵","🎮","🎮","💎","💎","⚽","⚽","🎁","🎁"];
let revealed = [];
let lock = false;
let timeLeft = 60;      // *** 60-second timer ***
let timerInterval;

/* Shuffle */
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* Start the game */
function startMemoriesGame() {
    // Reset UI
    grid.innerHTML = "";
    revealed = [];
    lock = false;

    // Reset timer
    timeLeft = 60;       // *** 60 seconds ***
    timerNumber.textContent = timeLeft;
    clearInterval(timerInterval);
    startTimer();

    // Build grid
    let shuffled = shuffle([...items]);

    shuffled.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memories-card");
        card.dataset.value = symbol;

        const icon = document.createElement("span");
        icon.textContent = symbol;

        card.appendChild(icon);
        card.addEventListener("click", () => revealCard(card));

        grid.appendChild(card);
    });
}

/* Timer */
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerNumber.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            loseGame();
        }
    }, 1000);
}

/* Lose condition */
function loseGame() {
    alert("⏳ Time's up! You lost. Restarting...");
    startMemoriesGame();
}

/* Reveal card */
function revealCard(card) {
    if (lock || card.classList.contains("revealed") || card.classList.contains("matched")) return;

    card.classList.add("revealed");
    revealed.push(card);

    if (revealed.length === 2) checkMatch();
}

/* Check match */
function checkMatch() {
    lock = true;
    const [c1, c2] = revealed;

    if (c1.dataset.value === c2.dataset.value) {
        c1.classList.add("matched");
        c2.classList.add("matched");

        revealed = [];
        lock = false;

        checkWin();
    } else {
        setTimeout(() => {
            c1.classList.remove("revealed");
            c2.classList.remove("revealed");
            revealed = [];
            lock = false;
        }, 700);
    }
}

/* Win Condition */
function checkWin() {
    const matchedCards = document.querySelectorAll(".matched");

    if (matchedCards.length === items.length) {
        clearInterval(timerInterval);

        setTimeout(() => {
            alert("🎉 You Won! Restarting...");
            startMemoriesGame();
        }, 500);
    }
}

/* Button listener */
restartBtn.addEventListener("click", startMemoriesGame);

/* Start at load */
startMemoriesGame();