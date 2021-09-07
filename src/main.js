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
                if (!hasSameBackground(item.style.background)) {
                    item.style.background = currentColor;
                    toggleCurrentColor();

                    item.innerHTML = currentPlayer;
                    toggleCurrentPlayer();

                    checkGameEnd();
                }
            }
        });
    }
});

// returns true if background is diferent than black or white
function hasSameBackground(background) {
    return background == black || background == white;
}

// toggles the current color
function toggleCurrentColor() {
    if (currentColor == white) currentColor = black;
    else if (currentColor == black) currentColor = white;
}

// toggles the current player
function toggleCurrentPlayer() {
    if (currentPlayer == "x") currentPlayer = "o";
    else if (currentPlayer == "o") currentPlayer = "x";
}

// sets gameFinised to true if the game must end
function checkGameEnd() {
    // if a player does three in a row, game must end
    if (trheeInARow("x")[0] || trheeInARow("o")[0]) {
        let winner;
        if (trheeInARow("x")[0]) winner = trheeInARow("x")[1];
        else if (trheeInARow("o")[0]) winner = trheeInARow("o")[1];

        if (winner == "x" || winner == "o") {
            setWinner(winner);
            gameFinised = true;
        }
    }

    // else, if all items are filled, game must end
    else if (allItemsFilled()) {
        winnerOutput.innerHTML = "Draw!";

        const gameOutput = document.getElementsByClassName("game-output");
        gameOutput[0].classList.remove("no-display");
        gameOutput[0].classList.add("display");
        gameFinised = true;
    }
}

// returns false if one of the items is "_", which means that not all items are filled yet
function allItemsFilled() {
    for (const item of items) {
        if (item.innerHTML == "_") return false;
    }
    return true;
}

// the first index of the array returns if there is three in a row or not. if it's true, also returns the items that made three in a row
function trheeInARow(p) {
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

function setWinner(winner) {
    winnerOutput.innerHTML = trheeInARow(winner)[1].toUpperCase() + " won the game.";

    const gameOutput = document.getElementsByClassName("game-output");
    gameOutput[0].classList.remove("no-display");
    gameOutput[0].classList.add("display");

    let arr = [
        document.getElementById(trheeInARow(winner)[2]),
        document.getElementById(trheeInARow(winner)[3]),
        document.getElementById(trheeInARow(winner)[4])
    ];

    arr.forEach(item => item.style.background = "rgb(29 195 72 / 58%)");
}

// todo: add a space " " between p and a of output game