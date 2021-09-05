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
        let winner;
        if (aux("x")[0]) winner = aux("x")[1];
        else if (aux("o")[0]) winner = aux("o")[1];

        if (typeof winner !== "undefined") auxWinner(winner);
    }

    function aux(p) { // p = player ("x" or "o")
        const item0 = document.getElementById("item-0");
        const item1 = document.getElementById("item-1");
        const item2 = document.getElementById("item-2");
        const item3 = document.getElementById("item-3");
        const item4 = document.getElementById("item-4");
        const item5 = document.getElementById("item-5");
        const item6 = document.getElementById("item-6");
        const item7 = document.getElementById("item-7");
        const item8 = document.getElementById("item-8");

        const item0Inner = document.getElementById("item-0").innerHTML;
        const item1Inner = document.getElementById("item-1").innerHTML;
        const item2Inner = document.getElementById("item-2").innerHTML;
        const item3Inner = document.getElementById("item-3").innerHTML;
        const item4Inner = document.getElementById("item-4").innerHTML;
        const item5Inner = document.getElementById("item-5").innerHTML;
        const item6Inner = document.getElementById("item-6").innerHTML;
        const item7Inner = document.getElementById("item-7").innerHTML;
        const item8Inner = document.getElementById("item-8").innerHTML;

        if (item0Inner == p && item1Inner == p && item2Inner == p) return [true, p, item0.id, item1.id, item2.id];
        if (item3Inner == p && item4Inner == p && item5Inner == p) return [true, p, item3.id, item4.id, item5.id];
        if (item6Inner == p && item7Inner == p && item8Inner == p) return [true, p, item6.id, item7.id, item8.id];

        if (item0Inner == p && item3Inner == p && item6Inner == p) return [true, p, item0.id, item3.id, item6.id];
        if (item1Inner == p && item4Inner == p && item7Inner == p) return [true, p, item1.id, item4.id, item7.id];
        if (item2Inner == p && item5Inner == p && item8Inner == p) return [true, p, item2.id, item5.id, item8.id];

        if (item0Inner == p && item4Inner == p && item8Inner == p) return [true, p, item0.id, item4.id, item8.id];
        if (item2Inner == p && item4Inner == p && item6Inner == p) return [true, p, item2.id, item4.id, item6.id];
        return false;
    }

    function auxWinner(winner) {
        console.log(aux(winner)[1] + " won the game");

        const item0 = document.getElementById(aux(winner)[2]);
        const item1 = document.getElementById(aux(winner)[3]);
        const item2 = document.getElementById(aux(winner)[4]);

        item0.style.background = "#2d7c08cc";
        item1.style.background = "#2d7c08cc";
        item2.style.background = "#2d7c08cc";
    }
});