document.addEventListener("DOMContentLoaded", () => {
    const items = document.getElementsByClassName("item");
    const white = "rgb(61, 65, 75)";
    const black = "rgba(19, 21, 24, 0.616)";
    let currentColor = black;
    let currentPlayer = "x";

    for (const item of items) {
        item.addEventListener('click', () => {
            if (item.style.background.length == 0) {
                item.style.background = currentColor;
                toggleCurrentColor();

                item.innerHTML = currentPlayer;
                toggleCurrentPlayer();
            }

            checkGameEnd();
        });
    }

    function toggleCurrentColor() {
        if (currentColor == white) currentColor = black;
        else if (currentColor == black) currentColor = white;
    }

    function toggleCurrentPlayer() {
        if (currentPlayer == "x") currentPlayer = "o";
        else if (currentPlayer == "o") currentPlayer = "x";
    }

    function checkGameEnd() {
        if (aux("x")) console.log("x won")
        else if (aux("o")) console.log("o won")
    }

    function aux(player) {
        const item0 = document.getElementById("item-0").innerHTML;
        const item1 = document.getElementById("item-1").innerHTML;
        const item2 = document.getElementById("item-2").innerHTML;
        const item3 = document.getElementById("item-3").innerHTML;
        const item4 = document.getElementById("item-4").innerHTML;
        const item5 = document.getElementById("item-5").innerHTML;
        const item6 = document.getElementById("item-6").innerHTML;
        const item7 = document.getElementById("item-7").innerHTML;
        const item8 = document.getElementById("item-8").innerHTML;

        if (item0 == player && item1 == player && item2 == player) return true;
        if (item3 == player && item4 == player && item5 == player) return true;
        if (item6 == player && item7 == player && item8 == player) return true;

        if (item0 == player && item3 == player && item6 == player) return true;
        if (item1 == player && item4 == player && item7 == player) return true;
        if (item2 == player && item5 == player && item8 == player) return true;

        if (item0 == player && item4 == player && item8 == player) return true;
        if (item2 == player && item4 == player && item6 == player) return true;
    }
});