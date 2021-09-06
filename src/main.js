const white = "rgb(61, 65, 75)";
const black = "rgba(19, 21, 24, 0.616)";
var gameFinised = false;
var items;
var currentColor;
var currentPlayer;
var winnerOutput;

document.addEventListener("DOMContentLoaded", () => {
    items = document.getElementsByClassName("item");
    winnerOutput = document.getElementById("winner-output");
    currentColor = black;
    currentPlayer = "x";

    for (const item of items) {
        item.addEventListener('click', () => {
            if (!gameFinised) {
                if (item.style.background.length == 0) {
                    item.style.background = currentColor;
                    toggleCurrentColor();

                    item.innerHTML = currentPlayer;
                    toggleCurrentPlayer();
                }
                checkGameEnd();
            }
        });
    }
});

function toggleCurrentColor() {
    if (currentColor == white) currentColor = black;
    else if (currentColor == black) currentColor = white;
}

function toggleCurrentPlayer() {
    if (currentPlayer == "x") currentPlayer = "o";
    else if (currentPlayer == "o") currentPlayer = "x";
}

function checkGameEnd() {
    let winner;
    if (aux("x")[0]) winner = aux("x")[1];
    else if (aux("o")[0]) winner = aux("o")[1];

    if (checkAllFilled()) {
        winnerOutput.innerHTML = "Draw!";

        const gameOutput = document.getElementsByClassName("game-output");
        gameOutput[0].classList.remove("no-display");
        gameOutput[0].classList.add("display");
    } else if (typeof winner !== "undefined") {
        auxWinner(winner);
        gameFinised = true;
    }
}

function aux(p) { // p = player ("x" or "o")
    const item0 = document.getElementById("item-0");
    const item1 = document.getElementById("item-1");
    const item2 = document.getElementById("item-2");
    const item3 = document.getElementById("item-3");
    const item4 = document.getElementById("item-4");
    const item5 = document.getElementById("item-5");
    const item6 = document.getElementById("item-6");
    const item7 = document.getElementById("item-7");
    const item8 = document.getElementById("item-8");

    const item0Inner = item0.innerHTML;
    const item1Inner = item1.innerHTML;
    const item2Inner = item2.innerHTML;
    const item3Inner = item3.innerHTML;
    const item4Inner = item4.innerHTML;
    const item5Inner = item5.innerHTML;
    const item6Inner = item6.innerHTML;
    const item7Inner = item7.innerHTML;
    const item8Inner = item8.innerHTML;

    if (item0Inner == p && item1Inner == p && item2Inner == p) return [true, p, item0.id, item1.id, item2.id];
    if (item3Inner == p && item4Inner == p && item5Inner == p) return [true, p, item3.id, item4.id, item5.id];
    if (item6Inner == p && item7Inner == p && item8Inner == p) return [true, p, item6.id, item7.id, item8.id];

    if (item0Inner == p && item3Inner == p && item6Inner == p) return [true, p, item0.id, item3.id, item6.id];
    if (item1Inner == p && item4Inner == p && item7Inner == p) return [true, p, item1.id, item4.id, item7.id];
    if (item2Inner == p && item5Inner == p && item8Inner == p) return [true, p, item2.id, item5.id, item8.id];

    if (item0Inner == p && item4Inner == p && item8Inner == p) return [true, p, item0.id, item4.id, item8.id];
    if (item2Inner == p && item4Inner == p && item6Inner == p) return [true, p, item2.id, item4.id, item6.id];

    return false;
}

function auxWinner(winner) {
    winnerOutput.innerHTML = aux(winner)[1].toUpperCase() + " won the game.";

    const gameOutput = document.getElementsByClassName("game-output");
    gameOutput[0].classList.remove("no-display");
    gameOutput[0].classList.add("display");

    let arr = [
        document.getElementById(aux(winner)[2]),
        document.getElementById(aux(winner)[3]),
        document.getElementById(aux(winner)[4])
    ];

    arr.forEach(item => item.style.background = "rgb(29 195 72 / 58%)");
}

// returns true if all the items are filled with white or black
function checkAllFilled() {
    for (const item of items) {
        if (item.innerHTML == "_") return false;
    }
    return true;
}

// todo: refactor a lot (: