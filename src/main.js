document.addEventListener("DOMContentLoaded", () => {
    const items = document.getElementsByClassName("item");
    const white = "rgb(61, 65, 75)";
    const black = "rgb(33, 37, 43)";
    let actualColor = black;

    for (let i = 0, len = items.length; i < len; i++) {
        items[i].addEventListener('click', () => {
            if (items[i].style.background.length == 0) {
                items[i].style.background = actualColor;
                toggleActualColor();
            }
            
            items[i].click();
            checkEndGame();
        });
    }

    function toggleActualColor() {
        if (actualColor == white) actualColor = black;
        else if (actualColor == black) actualColor = white;
    }

    function checkEndGame() {
        const item0 = document.getElementById("item-0");
        const item1 = document.getElementById("item-1");
        const item2 = document.getElementById("item-2");
        const item3 = document.getElementById("item-3");
        const item4 = document.getElementById("item-4");
        const item5 = document.getElementById("item-5");
        const item6 = document.getElementById("item-6");
        const item7 = document.getElementById("item-7");
        const item8 = document.getElementById("item-8");

        console.log(item0);
    }
});