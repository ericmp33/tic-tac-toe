document.addEventListener("DOMContentLoaded", () => {
    const desktopDiv = document.getElementById("info-desktop");
    const mobileDiv = document.getElementById("info-mobile");

    // first check
    responsiveDivCheck();

    // if window width changes, fit elements to it
    window.addEventListener('resize', () => {
        responsiveDivCheck();
    });

    // chooses which div has to appear, desktop or mobile one
    function responsiveDivCheck() {
        let windowWidth = window.innerWidth;

        if (windowWidth >= 386 && desktopDiv.classList.contains("display-none") ||
            windowWidth < 386 && mobileDiv.classList.contains("display-none")) {
            desktopDiv.classList.toggle("display-none");
            mobileDiv.classList.toggle("display-none");
        }
    }

    // remove the blur of the document elements after delay of time
    const allElements = new Array();
    const playAgain = document.getElementsByClassName("play-again");
    const items = document.getElementsByClassName("item");
    const info = document.getElementsByTagName("a");

    for (const element of playAgain) {
        allElements.push(element);
    }

    for (const element of items) {
        allElements.push(element);
    }

    for (const element of info) {
        allElements.push(element);
    }

    for (const element of allElements) {
        element.addEventListener("click", () => removeBlurSmoothly(element));
    }
});

// removes the blur of the parsed element with delay
const removeBlurSmoothly = async (element) => {
    await delay(1400);
    element.blur();
};

// utility function
const delay = m => new Promise(res => setTimeout(res, m));