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

// returns true and which items made it if there is three in a row
function threeInARow(p) {
    let conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const con of conditions) {
        const elements = document.querySelectorAll(`#item-${con[0]}, #item-${con[1]}, #item-${con[2]}`);
        if (threeRowAux(elements[0].innerHTML, elements[1].innerHTML, elements[2].innerHTML, p)) {
            return [true, p, `item-${con[0]}`, `item-${con[1]}`, `item-${con[2]}`];
        }
    }

    return false;
}

// returns true if all items are equals to player
function threeRowAux(itemA, itemB, itemC, p) {
    return itemA === p && itemB === p && itemC === p;
}
