document.addEventListener("DOMContentLoaded", () => {
    const items = document.getElementsByClassName("item");
    const white = "rgb(61, 65, 75)";
    const black = "rgba(19, 21, 24, 0.616)";
    let actualColor = black;
    let actualPlayer = "x";

    for (const item of items) {
        item.addEventListener('click', () => {
            if (item.style.background.length == 0) {
                item.style.background = actualColor;
                toggleActualColor();

                item.innerHTML = actualPlayer;
                toggleActualPlayer();
            }

            if (gameEnd()) console.log("Game ended");
        });
    }

    function toggleActualColor() {
        if (actualColor == white) actualColor = black;
        else if (actualColor == black) actualColor = white;
    }

    function toggleActualPlayer() {
        if (actualPlayer == "x") actualPlayer = "o";
        else if (actualPlayer == "o") actualPlayer = "x";
    }

    function gameEnd() {
        const item0 = document.getElementById("item-0").innerHTML;
        const item1 = document.getElementById("item-1").innerHTML;
        const item2 = document.getElementById("item-2").innerHTML;
        const item3 = document.getElementById("item-3").innerHTML;
        const item4 = document.getElementById("item-4").innerHTML;
        const item5 = document.getElementById("item-5").innerHTML;
        const item6 = document.getElementById("item-6").innerHTML;
        const item7 = document.getElementById("item-7").innerHTML;
        const item8 = document.getElementById("item-8").innerHTML;

        if (item0 == "x" && item1 == "x" && item2 == "x") return true;
        if (item3 == "x" && item4 == "x" && item5 == "x") return true;
        if (item6 == "x" && item7 == "x" && item8 == "x") return true;

        if (item0 == "x" && item3 == "x" && item6 == "x") return true;
        if (item1 == "x" && item4 == "x" && item7 == "x") return true;
        if (item2 == "x" && item5 == "x" && item8 == "x") return true;

        if (item0 == "x" && item4 == "x" && item8 == "x") return true;
        if (item2 == "x" && item4 == "x" && item6 == "x") return true;
    }
});