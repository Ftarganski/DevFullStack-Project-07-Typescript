var startedGame = false;

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

let scoreVariable = 0;
const score = document.getElementById("genius__score");
const areaError = document.getElementById("area__error");
let user: any = "";
let positions: any = [], mPositions: any = [];
let ranking: Array<any> = [];
const tagRanking = document.getElementById("ranking") as HTMLElement;

const toggleRanking = () => {
    let left:any = tagRanking.style.left;
    if(left === '0px'){
        tagRanking.style.left = '-100%';
    }else{
        tagRanking.style.left = '0px';
    }
}

const loadRanking = () => {
    const r = window.localStorage.getItem('ranking');
    if (r) {
        ranking = JSON.parse(r);
    }
    let list = `<ul>`;
    for (const rank of ranking) {
        list += `
        <li>${rank.user === "" ? "Anonymous" : rank.user} - ${rank.scoreVariable} </li>
        `;
    }

    list += '<ul>';
    tagRanking.children[1].innerHTML = list
}

const updateRanking = () => {
    ranking.push({
        user,
        scoreVariable
    });
    window.localStorage.setItem('ranking', JSON.stringify(ranking));
}

const configs = () => {
    parts.map((part, idx: number) => {
        part?.addEventListener('click', () => setPosition(idx))
    })
}

const alternateParts = (status: boolean) => {
    parts.map((part: any) => {
        part.disabled = status;
    })
}

const startGame = async () => {
    let userName = document.getElementById('name') as HTMLInputElement;
    user = userName.value;
    userName.value = "";
    if (score) {
        score.innerText = "0";
    }
    if (!startedGame) {
        startedGame = true;
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.innerHTML = "GAME </br> STARTED";
            btnStart.style.fontSize = "1.5em";
            btnStart.style.cursor = "none";
            alternateParts(false);
            loadPosition();
        }
    }
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
            updateRanking();
            loadRanking();
            alternateParts(true);
        } else {
            if (lastPosition === positions.length - 1) {
                setTimeout(async () => {
                    if (score) {
                        scoreVariable = positions.length;
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


const restartGame = () => {
    startedGame = false;
    positions = [];
    scoreVariable = 0;
    if (areaError) {
        areaError.style.display = "none";
    }
    startGame();
}

defineHeight();

window.addEventListener("resize", () => {
    defineHeight();
});

window.addEventListener("load", () => {
    configs();
    loadRanking();
});



