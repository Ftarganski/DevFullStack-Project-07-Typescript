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
var jogoIniciado = false;
const btnStart = document.getElementById('part-4');
const parts = [
    document.getElementById('part-0'),
    document.getElementById('part-1'),
    document.getElementById('part-2'),
    document.getElementById('part-3'),
    document.getElementById('part-4'),
];
const sounds = [
    new Audio('../build/assets/sounds/sound0.wav'),
    new Audio('../build/assets/sounds/sound1.wav'),
    new Audio('../build/assets/sounds/sound2.wav'),
    new Audio('../build/assets/sounds/sound3.wav'),
    new Audio('../build/assets/sounds/erro.mp3'),
];
const score = document.getElementById("genius__score");
const areaeError = document.getElementById("area__error");
let positions = [], mPositions = [];
const configs = () => {
    parts.map((part, idx) => {
        part === null || part === void 0 ? void 0 : part.addEventListener('click', (event) => setPosition(event));
    });
};
const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!jogoIniciado) {
        jogoIniciado = true;
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.innerHTML = "GAME </br> STARTED";
            btnStart.style.fontSize = "1.5em";
            btnStart.style.cursor = "none";
            loadPosition();
        }
    }
    // GAME POSITION GENERATION LOGIC
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
const setPosition = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let element = event.currentTarget.getAttribute(`source`);
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
        }), 700);
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }), 1500);
});
const defineHeight = () => {
    const elements = document.querySelectorAll(".genius__item");
    elements.forEach((element) => {
        element.style.height = `${element.clientWidth}px`;
    });
};
const restart = () => {
    jogoIniciado = false;
    if (btnStart) {
        btnStart.disabled = false;
        btnStart.innerHTML = "START";
        btnStart.style.fontSize = "2em";
    }
};
const lost = (bootstrap, element) => {
    const verify = verifySentence();
    if (!verify) {
        const modal = new bootstrap.Modal(element, {});
        modal.show();
    }
};
const verifySentence = () => {
    return false;
};
defineHeight();
window.addEventListener("resize", () => {
    defineHeight();
});
window.addEventListener("load", () => {
    configs();
});
