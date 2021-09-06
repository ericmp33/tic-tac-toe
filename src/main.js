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

function aux(p) {
    const i0 = document.getElementById("item-0");
    const i1 = document.getElementById("item-1");
    const i2 = document.getElementById("item-2");
    const i3 = document.getElementById("item-3");
    const i4 = document.getElementById("item-4");
    const i5 = document.getElementById("item-5");
    const i6 = document.getElementById("item-6");
    const i7 = document.getElementById("item-7");
    const i8 = document.getElementById("item-8");

    const i0Inner = i0.innerHTML;
    const i1Inner = i1.innerHTML;
    const i2Inner = i2.innerHTML;
    const i3Inner = i3.innerHTML;
    const i4Inner = i4.innerHTML;
    const i5Inner = i5.innerHTML;
    const i6Inner = i6.innerHTML;
    const i7Inner = i7.innerHTML;
    const i8Inner = i8.innerHTML;

    if (i0Inner == p && i1Inner == p && i2Inner == p) return [true, p, i0.id, i1.id, i2.id];
    if (i3Inner == p && i4Inner == p && i5Inner == p) return [true, p, i3.id, i4.id, i5.id];
    if (i6Inner == p && i7Inner == p && i8Inner == p) return [true, p, i6.id, i7.id, i8.id];

    if (i0Inner == p && i3Inner == p && i6Inner == p) return [true, p, i0.id, i3.id, i6.id];
    if (i1Inner == p && i4Inner == p && i7Inner == p) return [true, p, i1.id, i4.id, i7.id];
    if (i2Inner == p && i5Inner == p && i8Inner == p) return [true, p, i2.id, i5.id, i8.id];

    if (i0Inner == p && i4Inner == p && i8Inner == p) return [true, p, i0.id, i4.id, i8.id];
    if (i2Inner == p && i4Inner == p && i6Inner == p) return [true, p, i2.id, i4.id, i6.id];

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
// todo refactor css, html too
// todo: add a space " " between p and a of output game
// todo: check if ctrl enter keeps spawning a new page