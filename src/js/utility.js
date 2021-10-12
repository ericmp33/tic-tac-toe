document.addEventListener("DOMContentLoaded", () => {
    const desktopDiv = document.getElementById("info-desktop");
    const mobileDiv = document.getElementById("info-mobile");

    // first check
    responsiveDivCheck();

    // if window width changes, fit elements to it
    window.addEventListener('resize', responsiveDivCheck);

    // chooses which div has to appear, desktop or mobile one
    function responsiveDivCheck() {
        let windowWidth = window.innerWidth;

        if (windowWidth >= 386 && desktopDiv.classList.contains("display-none") ||
            windowWidth < 386 && mobileDiv.classList.contains("display-none")) {
            desktopDiv.classList.toggle("display-none");
            mobileDiv.classList.toggle("display-none");
        }
    }

    // add user interactive elements to allElements array
    const allElements = [
        ...document.getElementsByClassName("play-again"),
        ...document.getElementsByClassName("item"),
        ...document.getElementsByTagName("a")
    ];

    // remove blur of elements after delay of time
    allElements.forEach(element => element.addEventListener('click', () =>
        removeBlurSmoothly(element)
    ));
});

// removes the blur of the parsed element with delay
const removeBlurSmoothly = async (element) => {
    await delay(1400);
    element.blur();
};

// utility function to set an async delay
const delay = m => new Promise(res => setTimeout(res, m));