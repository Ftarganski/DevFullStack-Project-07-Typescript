var jogoIniciado = false;

const btnStart = document.getElementById('part-4') as HTMLButtonElement | null;

const defineHeight = () => {
    const elements: any = document.querySelectorAll(".genius__item");
    elements.forEach((element: any) => {
        element.style.height = `${element.clientWidth}px`
    })
}

const startGame = () => {
    if (!jogoIniciado) {
        alert("Go!");
        jogoIniciado = true;
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.style.cursor = "none";
            btnStart.style.color = "black";
        }
    }
}

defineHeight();

window.addEventListener("resize", () => {
    defineHeight();
})




