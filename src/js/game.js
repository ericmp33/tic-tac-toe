const WHITE = "rgb(61, 65, 75)"
const BLACK = "rgba(19, 21, 24, 0.616)"
const GREEN = "rgba(29, 195, 72, 58%)"

const items = document.querySelectorAll(".item")
const gameOutput = document.querySelector("#gameOutput")
const winnerOutput = document.querySelector("#winner")

let gameFinished = false
let currentColor = BLACK
let currentPlayer = "x"

for (const item of items) {
  // if any game item is clicked, do game logic
  item.addEventListener('click', () => {
    // if game isn't finished and item doesn't have background
    if (! gameFinished && item.style.background === "") {
      // set item's background
      item.style.background = currentColor
      toggleCurrentColor()

      // set item's player
      item.textContent = currentPlayer
      toggleCurrentPlayer()

      checkGameEnd()
    }
  })
}

document.querySelectorAll(".play-again").forEach(playAgainBtn => {
  // if any "Play again" button is clicked
  playAgainBtn.addEventListener('click', () => {
    // reset and restart game
    winnerOutput.textContent = ""

    gameOutput.classList.add("display-none")

    for (const item of items) {
      item.style.background = ""
      item.textContent = "_"
    }

    gameFinished = false
    currentColor = BLACK
    currentPlayer = "x"
  })
})

/**
 * Toggles currentColor variable's value.
 * Valid values: constraints WHITE or BLACK
 */
const toggleCurrentColor = () => {
  if (currentColor === WHITE) currentColor = BLACK
  else if (currentColor === BLACK) currentColor = WHITE
  else console.error(`Unexpected currentColor value`)
}

/**
 * Toggles currentPlayer variable's value.
 * Valid values: "x" or "o"
 */
const toggleCurrentPlayer = () => {
  if (currentPlayer === "x") currentPlayer = "o"
  else if (currentPlayer === "o") currentPlayer = "x"
  else console.error(`Unexpected currentPlayer value`)
}

/**
 * Checks if game has to end. Handles game's logic.
 */
const checkGameEnd = () => {
  // store if "x" or "o" made 3 in a row
  let playerWon = threeInARow("x") || threeInARow("o")
  let allItemsFilled = areAllItemsFilled()

  if (playerWon) {
    winnerOutput.textContent = `${playerWon[1].toUpperCase()} won!`

    colorizeGreen([
      document.querySelector("#" + playerWon[2]),
      document.querySelector("#" + playerWon[3]),
      document.querySelector("#" + playerWon[4])
    ])
  }

  else if (allItemsFilled) {
    winnerOutput.textContent = "Draw!"
  }

  if (playerWon || allItemsFilled) {
    gameFinished = true
    gameOutput.classList.remove("display-none")
  }
}

/**
 * Changes parsed DOM elements background color to green.
 * @param {Array} array Array containing DOM elements
 */
const colorizeGreen = array => {
  array.forEach(item => item.style.background = GREEN)
}

/**
 * Checks if all items are different than "_", which means all items are filled.
 * @returns True if all items are different than "_". Otherwise, false.
 */
const areAllItemsFilled = () => {
  for (const item of items) {
    if (item.textContent === "_") return false
  }

  return true
}

/**
 * For each win condition, checks if items are equal to player. If so, did three in a row and won the game.
 * 
 * @param {String} playerName Player's name ("x" or "o")
 * @returns If condition is true, array with 1st element to true with DOM elements that made the three in a row. Otherwise, false
 */
const threeInARow = playerName => {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8]
  ]

  for (const con of winConditions) {
    const elements = document.querySelectorAll(`#item-${con[0]}, #item-${con[1]}, #item-${con[2]}`)

    if (allItemsAreEqual([elements[0].textContent, elements[1].textContent, elements[2].textContent, playerName])) {
      return [
        true,
        playerName,
        `item-${con[0]}`,
        `item-${con[1]}`,
        `item-${con[2]}`
      ]
    }
  }

  return false
}

/**
 * Checks if all array items are equal.
 * 
 * @param {Array} array Array of items to be checked
 */
const allItemsAreEqual = array => {
  return array.every((val, i, arr) => val === arr[0])  
}