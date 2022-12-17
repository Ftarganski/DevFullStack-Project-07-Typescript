"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var startedGame = false;
const btnStart = document.getElementById('part-4');
const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3'),
];
const sounds = [
    new Audio('../build/assets/sounds/000.mp3'),
    new Audio('../build/assets/sounds/001.mp3'),
    new Audio('../build/assets/sounds/002.mp3'),
    new Audio('../build/assets/sounds/003.mp3'),
    new Audio('../build/assets/sounds/erro.mp3'),
];
let scoreVariable = 0;
const score = document.getElementById("genius__score");
const areaError = document.getElementById("area__error");
let user = "";
let positions = [], mPositions = [];
const tagRanking = document.getElementById('ranking');
const tagMyRanking = document.getElementById('my-ranking');
const speedVariable = document.getElementById('speed-variable');
let speed = 1;
let inputSpeed = document.querySelector('#speed');
const _get = (endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'GET'
    });
    const result = yield response.json();
    return result;
});
const _post = (endpoint, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        body: data
    });
    const result = yield response.json();
    return result;
});
const updateSpeedArea = (speed) => {
    inputSpeed.value = speed.toString();
    speedVariable.innerText = speed.toString();
};
inputSpeed.addEventListener('change', (event) => {
    if (event.currentTarget) {
        const selectedSpeed = event.currentTarget.value;
        updateSpeedArea(selectedSpeed);
        window.localStorage.setItem('speed', selectedSpeed);
    }
});
const loadSpeed = () => {
    const sd = window.localStorage.getItem('speed');
    if (sd) {
        speed = parseInt(sd);
    }
    updateSpeedArea(speed);
};
const toggleRanking = (type) => {
    if (type === 1) {
        let position = tagRanking.style.left;
        if (position === '0px') {
            tagRanking.style.left = '-100%';
        }
        else {
            tagRanking.style.left = '0px';
        }
    }
    else {
        let position = tagMyRanking.style.right;
        if (position === '0px') {
            tagMyRanking.style.right = '-100%';
        }
        else {
            tagMyRanking.style.right = '0px';
        }
    }
};
const loadRanking = () => __awaiter(void 0, void 0, void 0, function* () {
    const ranking = yield _get('game/score?order=score,desc');
    const myRanking = yield _get('game/score/1?order=score,desc');
    constructRanking(ranking, tagRanking);
    constructRanking(myRanking, tagMyRanking);
});
const constructRanking = (item, tag) => {
    let list = `<ul>`;
    for (const i of item) {
        list += `
        <li>${i.user_id} - ${i.score} </li>
        `;
    }
    list += '<ul>';
    tag.children[1].innerHTML = list;
};
const updateRanking = () => {
};
const configs = () => {
    parts.map((part, idx) => {
        part === null || part === void 0 ? void 0 : part.addEventListener('click', () => setPosition(idx));
    });
};
const alternateParts = (status) => {
    parts.map((part) => {
        part.disabled = status;
    });
};
const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    let userName = document.getElementById('name');
    user = userName.value;
    if (user !== "") {
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
    else {
        alert("Set yout username to start!");
        if (btnStart) {
            btnStart.disabled = false;
        }
    }
});
const loadPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let aleatory = 0;
    if (positions.length >= 4) {
        aleatory = Math.floor(Math.random() * 4);
    }
    else {
        if (positions.length > 0) {
            aleatory = positions[positions.length - 1] + 1;
        }
    }
    positions.push(aleatory);
    yield iluminatePosition();
    mPositions = [];
});
const setPosition = (idx) => __awaiter(void 0, void 0, void 0, function* () {
    let position = idx;
    sounds[position].play();
    mPositions.push(position);
    let lastPosition = mPositions.length - 1;
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (positions[lastPosition] !== mPositions[lastPosition]) {
            sounds[4].play();
            if (areaError) {
                areaError.style.display = "block";
            }
            updateRanking();
            loadRanking();
            alternateParts(true);
        }
        else {
            if (lastPosition === positions.length - 1) {
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    if (score) {
                        scoreVariable = positions.length;
                        score.innerText = positions.length;
                    }
                    yield loadPosition();
                }), 300 / speed);
            }
        }
    }), 300 / speed);
});
const iluminatePosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    let interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let item = positions[i];
        yield sounds[item].play();
        yield ((_a = parts[item]) === null || _a === void 0 ? void 0 : _a.classList.add(`genius__item--${item}__active`));
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            yield ((_b = parts[item]) === null || _b === void 0 ? void 0 : _b.classList.remove(`genius__item--${item}__active`));
        }), 300 / speed);
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }), 1200 / speed);
});
const defineHeight = () => {
    const elements = document.querySelectorAll(".genius__item");
    elements.forEach((element) => {
        element.style.height = `${element.clientWidth}px`;
    });
};
const restartGame = () => {
    startedGame = false;
    positions = [];
    scoreVariable = 0;
    if (areaError) {
        areaError.style.display = "none";
    }
    startGame();
};
defineHeight();
window.addEventListener("resize", () => {
    defineHeight();
});
window.addEventListener("load", () => {
    configs();
    loadRanking();
    loadSpeed();
});
