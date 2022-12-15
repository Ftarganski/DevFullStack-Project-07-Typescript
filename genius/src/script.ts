var jogoIniciado = false;

const btnStart = document.getElementById('part-4') as HTMLButtonElement | null;

const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3'),
]

const sounds = [
    new Audio('../build/assets/sounds/sound0.wav'),
    new Audio('../build/assets/sounds/sound1.wav'),
    new Audio('../build/assets/sounds/sound2.wav'),
    new Audio('../build/assets/sounds/sound3.wav'),
    new Audio('../build/assets/sounds/erro.mp3'),
]

const score = document.getElementById("genius__score");

const areaError = document.getElementById("area__error");

let positions: any = [], mPositions: any = [];

const configs = () => {
    parts.map((part, idx:number) => {
        part?.addEventListener('click', () => setPosition(idx))
    })
}

const startGame = async () => {
    if (!jogoIniciado) {
        jogoIniciado = true;
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.innerHTML = "GAME </br> STARTED";
            btnStart.style.fontSize = "1.5em";
            btnStart.style.cursor = "none";
            loadPosition();
            parts.map((part: any) => {
                part.disabled = false;
            })
        }

    }
    // GAME POSITION GENERATION LOGIC
}

const loadPosition = async () => {
    let aleatory = 0;
    if (positions.length >= 4) {
        aleatory = Math.floor(Math.random() * 4)
    } else {
        if 
        (positions.length > 0) {
            aleatory = positions[positions.length - 1] + 1;
        }
    }
    positions.push(aleatory);
    await iluminatePosition();
    mPositions = [];
}

const setPosition = async (idx: number) => {
    let position = idx;
    sounds[position].play();
    mPositions.push(position);
  

    let lastPosition = mPositions.length - 1;
    setTimeout(async () => {
        if (positions[lastPosition] !== mPositions[lastPosition]) {
            sounds[4].play();
            if (areaError) {
                areaError.style.display = "block";
            }
        } else {
            if (lastPosition === positions.length - 1) {
                setTimeout(async () => {
                    if (score) {
                        score.innerText = positions.length;
                    }
                    await loadPosition();
                }, 300)
            }

        }
    }, 1000)
}

const iluminatePosition = async () => {
    let i = 0;
    let interval = setInterval(async () => {
        let item = positions[i];
        await sounds[item].play()
        await parts[item]?.classList.add(`genius__item--${item}__active`)
        setTimeout(async () => {
            await parts[item]?.classList.remove(`genius__item--${item}__active`)
        }, 300)
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }, 1500);
}

const defineHeight = () => {
    const elements: any = document.querySelectorAll(".genius__item");
    elements.forEach((element: any) => {
        element.style.height = `${element.clientWidth}px`
    })
}




const restart = () => {
    jogoIniciado = false;
    if (btnStart) {
        btnStart.disabled = false;
        btnStart.innerHTML = "START";
        btnStart.style.fontSize = "2em";
    }
}

const lost = (bootstrap: any, element: HTMLElement) => {
    const verify = verifySentence();
    if (!verify) {
        const modal = new bootstrap.Modal(element, {});
        modal.show();
    }
}

const verifySentence = () => {
    return false;

}

defineHeight();

window.addEventListener("resize", () => {
    defineHeight();
});


window.addEventListener("load", () => {
    configs();
});



