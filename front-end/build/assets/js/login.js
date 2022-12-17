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
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = document.querySelector('#inputUserEmail');
    const password = document.querySelector('#inputPassword');
    const data = {
        userEmail: userEmail.value,
        password: password.value,
    };
    const response = yield fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = yield response.json();
    alert(result.msg);
    if (response.status === 200) {
        window.localStorage.setItem('user', JSON.stringify(result.user));
        window.location.replace("http://127.0.0.1:5500/front-end/build/index.html");
    }
});
window.addEventListener('load', () => {
    const user = window.localStorage.getItem('user');
    if (user) {
        window.location.replace("http://127.0.0.1:5500/front-end/build/index.html");
    }
});
