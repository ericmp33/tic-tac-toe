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
            if (!gameFinised && hasDifBackground(item.style.background)) {
                item.style.background = currentColor;
                toggleCurrentColor();

                item.innerHTML = currentPlayer;
                toggleCurrentPlayer();

                checkGameEnd();
            }
        });
    }
});

// returns true if parsed background is diferent than black or white
function hasDifBackground(background) {
    return !(background == black || background == white);
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

// if the game must end sets gameFinised to true 
function checkGameEnd() {
    let condition1 = trheeInARow("x")[0] || trheeInARow("o")[0];
    let condition2 = allItemsFilled();

    // if a player does three in a row, game must end
    if (condition1) {
        let winner;
        if (trheeInARow("x")[0]) winner = trheeInARow("x")[1];
        else if (trheeInARow("o")[0]) winner = trheeInARow("o")[1];

        winnerOutput.innerHTML = trheeInARow(winner)[1].toUpperCase() + " won the game.";
        colorizeGreen(winner);
        gameFinised = true;
    }

    // else, if all items are filled, game must end
    else if (condition2) {
        winnerOutput.innerHTML = "Draw!";
        gameFinised = true;
    }

    // common code if one of the conditions is true
    if (condition1 || condition2) {
        const gameOutput = document.getElementsByClassName("game-output");
        gameOutput[0].classList.remove("no-display");
        gameOutput[0].classList.add("display");
    }
}

// colorizes to green the items that made three in a row
function colorizeGreen(winner) {
    [
        document.getElementById(trheeInARow(winner)[2]),
        document.getElementById(trheeInARow(winner)[3]),
        document.getElementById(trheeInARow(winner)[4])
    ]
        .forEach(item => item.style.background = "rgb(29 195 72 / 58%)");
}

// returns true if all items are different than "_", which means all items are filled
function allItemsFilled() {
    for (const item of items) {
        if (item.innerHTML == "_") return false;
    }
    return true;
}

// returns true if there is three in a row. if true, also returns which items made it
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

    if (trheeRowAux(i0Inner, i1Inner, i2Inner, p)) return [true, p, i0.id, i1.id, i2.id];
    if (trheeRowAux(i0Inner, i1Inner, i2Inner, p)) return [true, p, i0.id, i1.id, i2.id];
    if (trheeRowAux(i3Inner, i4Inner, i5Inner, p)) return [true, p, i3.id, i4.id, i5.id];
    if (trheeRowAux(i6Inner, i7Inner, i8Inner, p)) return [true, p, i6.id, i7.id, i8.id];

    if (trheeRowAux(i0Inner, i3Inner, i6Inner, p)) return [true, p, i0.id, i3.id, i6.id];
    if (trheeRowAux(i1Inner, i4Inner, i7Inner, p)) return [true, p, i1.id, i4.id, i7.id];
    if (trheeRowAux(i2Inner, i5Inner, i8Inner, p)) return [true, p, i2.id, i5.id, i8.id];

    if (trheeRowAux(i0Inner, i4Inner, i8Inner, p)) return [true, p, i0.id, i4.id, i8.id];
    if (trheeRowAux(i2Inner, i4Inner, i6Inner, p)) return [true, p, i2.id, i4.id, i6.id];

    return false;
}

// returns true if all items are equals to player
function trheeRowAux(itemA, itemB, itemC, player) {
    return itemA == player && itemB == player && itemC == player;
}

// todo: add a space " " between p and a of output game