const white = "rgb(61, 65, 75)";
const black = "rgba(19, 21, 24, 0.616)";
const green = "rgba(29, 195, 72, 58%)";
let gameFinished = false;
let items;
let currentColor;
let currentPlayer;
let gameOutput;
let winnerOutput;

document.addEventListener("DOMContentLoaded", () => {
    items = document.querySelectorAll(".item");
    gameOutput = document.querySelector("#game-output");
    winnerOutput = document.querySelector("#winner");
    currentColor = black;
    currentPlayer = "x";

    // if any game item is clicked, do game logic
    for (const item of items) {
        item.addEventListener('click', () => {
            // if game isn't finished and item doesn't have background
            if (!gameFinished && item.style.background === "") {
                item.style.background = currentColor;
                toggleCurrentColor();

                item.innerHTML = currentPlayer;
                toggleCurrentPlayer();

                checkGameEnd();
            }
        });
    }

    // if one of the 2 play again game elements is clicked, reset and restart game
    const playAgain = document.querySelectorAll(".play-again");
    for (const element of playAgain) {
        element.addEventListener('click', () => {
            // reset all elements
            winnerOutput.innerHTML = "";

            if (gameFinished) {
                gameOutput.classList.toggle("display-none");
            }

            for (const item of items) {
                item.style.background = "";
                item.innerHTML = "_";
            }

            gameFinished = false;
            currentColor = black;
            currentPlayer = "x";
        });
    }
});

function toggleCurrentColor() {
    if (currentColor === white) currentColor = black;
    else if (currentColor === black) currentColor = white;
}

function toggleCurrentPlayer() {
    if (currentPlayer === "x") currentPlayer = "o";
    else if (currentPlayer === "o") currentPlayer = "x";
}

// if game must end sets gameFinished to true 
function checkGameEnd() {
    let arrThreeInARow = threeInARow("x") || threeInARow("o");
    let condition1 = arrThreeInARow[0];
    let condition2 = allItemsFilled();

    // if a player does three in a row, game must end
    if (condition1) {
        let winner = arrThreeInARow[1];
        winnerOutput.innerHTML = winner.toUpperCase() + " won!";
        colorizeGreen(arrThreeInARow);
    }

    // else, if all items are filled, game must end
    else if (condition2) {
        winnerOutput.innerHTML = "Draw!";
    }

    // if one of the conditions is true
    if (condition1 || condition2) {
        gameFinished = true;
        gameOutput.classList.toggle("display-none");
    }
}

// colorizes to green the items that made three in a row
function colorizeGreen(arrThreeInARow) {
    [
        document.querySelector("#" + arrThreeInARow[2]),
        document.querySelector("#" + arrThreeInARow[3]),
        document.querySelector("#" + arrThreeInARow[4])
    ]
        .forEach(item => item.style.background = green);
}

// returns true if all items are different than "_", which means all items are filled
function allItemsFilled() {
    for (const item of items) {
        if (item.innerHTML === "_") return false;
    }
    return true;
}

// returns true if there is three in a row. if true, also returns which items made it
function threeInARow(p) {
    const i0 = document.querySelector("#item-0");
    const i1 = document.querySelector("#item-1");
    const i2 = document.querySelector("#item-2");
    const i3 = document.querySelector("#item-3");
    const i4 = document.querySelector("#item-4");
    const i5 = document.querySelector("#item-5");
    const i6 = document.querySelector("#item-6");
    const i7 = document.querySelector("#item-7");
    const i8 = document.querySelector("#item-8");

    const i0Inner = i0.innerHTML;
    const i1Inner = i1.innerHTML;
    const i2Inner = i2.innerHTML;
    const i3Inner = i3.innerHTML;
    const i4Inner = i4.innerHTML;
    const i5Inner = i5.innerHTML;
    const i6Inner = i6.innerHTML;
    const i7Inner = i7.innerHTML;
    const i8Inner = i8.innerHTML;

    if (threeRowAux(i0Inner, i1Inner, i2Inner, p)) return [true, p, i0.id, i1.id, i2.id];
    if (threeRowAux(i3Inner, i4Inner, i5Inner, p)) return [true, p, i3.id, i4.id, i5.id];
    if (threeRowAux(i6Inner, i7Inner, i8Inner, p)) return [true, p, i6.id, i7.id, i8.id];

    if (threeRowAux(i0Inner, i3Inner, i6Inner, p)) return [true, p, i0.id, i3.id, i6.id];
    if (threeRowAux(i1Inner, i4Inner, i7Inner, p)) return [true, p, i1.id, i4.id, i7.id];
    if (threeRowAux(i2Inner, i5Inner, i8Inner, p)) return [true, p, i2.id, i5.id, i8.id];

    if (threeRowAux(i0Inner, i4Inner, i8Inner, p)) return [true, p, i0.id, i4.id, i8.id];
    if (threeRowAux(i2Inner, i4Inner, i6Inner, p)) return [true, p, i2.id, i4.id, i6.id];

    return false;
}

// returns true if all items are equals to player
function threeRowAux(itemA, itemB, itemC, p) {
    return itemA === p && itemB === p && itemC === p;
}