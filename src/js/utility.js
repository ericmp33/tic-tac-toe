document.addEventListener("DOMContentLoaded", () => {
    const desktopDiv = document.getElementById("info");
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
});