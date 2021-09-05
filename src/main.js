document.addEventListener("DOMContentLoaded", () => {
    let items = document.getElementsByClassName("item");

    for (let i = 0, len = items.length; i < len; i++) {
        items[i].addEventListener('click', () => {
            items[i].style.background = "red"
        })
    }
})

// todo: fer que fins que no es carregui la lletra que no aparegui res