const desktopDiv = document.querySelector("#info-desktop")
const mobileDiv = document.querySelector("#info-mobile")

/**
 * Shows/hides mobile/desktop div depending on current window width.
 */
const responsiveDivCheck = () => {
  if (window.innerWidth >= 386) {
    desktopDiv.classList.remove("display-none")
    mobileDiv.classList.add("display-none")
  } else {
    desktopDiv.classList.add("display-none")
    mobileDiv.classList.remove("display-none")
  }
}

// first check
responsiveDivCheck()

// if window width changes, fit elements to it
window.addEventListener('resize', responsiveDivCheck)

// add user interactive elements to allElements array
const allElements = document.querySelectorAll(".play-again, .item, a")

// remove blur of elements after delay of time
allElements.forEach(element => element.addEventListener('click', async () => {
  // wait 1.4 seconds
  await delay(1400)

  element.blur()
}))

/**
 * Sets an async delay of time.
 * @param {Number} miliseconds Time to wait, in miliseconds
 */
const delay = miliseconds => new Promise(res => setTimeout(res, miliseconds))