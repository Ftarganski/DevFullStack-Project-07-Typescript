var startedGame = false;
const btnStart = document.getElementById('part-4') as HTMLButtonElement | null;
const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3'),
]

const sounds = [
    new Audio('../build/assets/sounds/000.mp3'),
    new Audio('../build/assets/sounds/001.mp3'),
    new Audio('../build/assets/sounds/002.mp3'),
    new Audio('../build/assets/sounds/003.mp3'),
    new Audio('../build/assets/sounds/erro.mp3'),
]

let scoreVariable = 0;
const score = document.getElementById("genius__score");
const areaError = document.getElementById("area__error");
let positions: any = [], mPositions: any = [];
const tagRanking = document.getElementById('ranking') as HTMLElement;
const tagMyRanking = document.getElementById('my-ranking') as HTMLElement;
const speedVariable = document.getElementById('speed-variable') as HTMLElement
let speed = 1;
let inputSpeed = document.querySelector('#speed') as HTMLInputElement;
const userLogged = getUser();
const btnIn: any = document.querySelector('#btn-in');
const btnOut: any = document.querySelector('#btn-out');
const btnMyRanking: any = document.querySelector('#btn-my-ranking');

inputSpeed.addEventListener('change', (event: any) => {
    if (event.currentTarget) {
        const selectedSpeed = event.currentTarget.value;
        updateSpeedArea(selectedSpeed);
        window.localStorage.setItem('speed', selectedSpeed);
    }
})

const _get = async (endpoint: string) => {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'GET'
    });
    const result = await response.json();
    return result;
}

const _post = async (endpoint: string, data: any) => {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    return result;
}

const updateSpeedArea = (speed: any) => {
    inputSpeed.value = speed.toString();
    speedVariable.innerText = speed.toString();
}

const loadSpeed = () => {
    const sd = window.localStorage.getItem('speed');
    if (sd) {
        speed = parseInt(sd);
    }
    updateSpeedArea(speed)
}

const toggleRanking = (type: number) => {
    if (type === 1) {
        let position: any = tagRanking.style.left;
        if (position === '0px') {
            tagRanking.style.left = '-100%';
        } else {
            tagRanking.style.left = '0px';
        }
    } else {
        let position: any = tagMyRanking.style.right;
        if (position === '0px') {
            tagMyRanking.style.right = '-100%';
        } else {
            tagMyRanking.style.right = '0px';
        }
    }
}

const loadRanking = async () => {
    const ranking = await _get('game/score?order=score,desc&limit=20');
    constructRanking(ranking, tagRanking);

    if (isLoggedIn()) {
        const myRanking = await _get(`game/score/${userLogged.id}?order=score,desc&limit=20`);
        constructRanking(myRanking, tagMyRanking);
    }
}

const constructRanking = (item: any, tag: any) => {
    let list = `<ul>`;
    for (const i of item) {
        list += `
        <li>${i.user_id} - ${i.score} </li>
        `;
    }
    list += '<ul>';
    tag.children[1].innerHTML = list
}

const updateRanking = async () => {
    await _post('game/score', {
        score: scoreVariable,
        user_id: userLogged.id
    })
    loadRanking();
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
    if(score){
        score.innerText = "0";
    }
    if(!startedGame){
        startedGame = true;
        if(btnStart){
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
                }, 300 / speed)
            }
        }
    }, 300 / speed)
}

const iluminatePosition = async () => {
    let i = 0;
    let interval = setInterval(async () => {
        let item = positions[i];
        await sounds[item].play()
        await parts[item]?.classList.add(`genius__item--${item}__active`)
        setTimeout(async () => {
            await parts[item]?.classList.remove(`genius__item--${item}__active`)
        }, 300 / speed)
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }, 1200 / speed);
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

const isLoggedIn = () => {
    const user = window.localStorage.getItem('user');
    if (user) {
        btnIn.style.display = 'none';
        btnOut.style.display = 'block';
        btnMyRanking.style.display = 'inline-block';
    } else {
        btnIn.style.display = 'none';
        btnOut.style.display = 'block';
        btnMyRanking.style.display = 'none';
    }
    return user;
}

const logout = () => {
    window.localStorage.clear();
    window.location.replace("https://genius-game-b67fa.web.app/front-end/build/login.html");
}

function getUser() {
    const user = window.localStorage.getItem('user');
    if (user) {
        return JSON.parse(user)
    }
    return null;
}

defineHeight();

window.addEventListener("resize", () => {
    defineHeight();
});

window.addEventListener("load", () => {
    configs();
    loadRanking();
    loadSpeed();
});