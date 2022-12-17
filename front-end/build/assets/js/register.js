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
const emailValidation = (value, name) => {
    var re = /\S+@\S+\.\S+/;
    const result = re.test(value);
    const element = document.querySelector(`#${name}Help`);
    if (!result) {
        element.style.color = 'red';
    }
    else {
        element.style.color = 'blue';
    }
};
const usernameValidation = (value, name, key) => {
    const element1 = document.querySelector(`${name}Help1`);
    const element2 = document.querySelector(`${name}Help2`);
    //TESTE CARACTERE ESPECIAL
    let result1 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    if (result1) {
        element1.style.color = 'red';
    }
    else {
        element1.style.color = 'blue';
    }
    //TESTE ESPAÇOS
    let result2 = /\s/g.test(value);
    if (result2) {
        element2.style.color = 'red';
    }
    else {
        element2.style.color = 'blue';
    }
    if (result1 && result2) {
        inputs[key].valid = false;
    }
    else {
        inputs[key].valid = true;
    }
};
const passwordValidation = (value, name, key) => {
    const element1 = document.querySelector(`#${name}Help1`), element2 = document.querySelector(`#${name}Help2`), element3 = document.querySelector(`#${name}Help3`), element4 = document.querySelector(`#${name}Help4`);
    if (value.length >= 8) {
        element1.style.color = 'blue';
    }
    else {
        element1.style.color = 'red';
    }
    let result2 = /[A-Z]/.test(value);
    if (result2) {
        element2.style.color = 'blue';
    }
    else {
        element2.style.color = 'red';
    }
    let result3 = /[a-z]/.test(value);
    if (result3) {
        element3.style.color = 'blue';
    }
    else {
        element3.style.color = 'red';
    }
    let result4 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    if (result4) {
        element4.style.color = 'blue';
    }
    else {
        element4.style.color = 'red';
    }
    if (result2 && result3 && result4 && value.length >= 8) {
        inputs[key].valid = true;
    }
    else {
        inputs[key].valid = false;
    }
};
const validateEqualPassword = (value, name, key) => {
    const element5 = document.querySelector(`#${name}Help1`);
    if (value === inputs['inputPassword'].input.value) {
        element5.style.color = 'blue';
        inputs[key].valid = true;
    }
    else {
        element5.style.color = 'red';
        inputs[key].valid = false;
    }
};
const register = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = validFields();
    if (result) {
        let data = {};
        keys.forEach(key => {
            if (inputs[key].name !== 'confirmPassword') {
                data[inputs[key].name] = inputs[key].input.value;
            }
        });
        try {
            const response = yield fetch(`http://localhost:3000/auth/register`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = yield response.json();
            alert(result.msg);
            if (response.status === 201) {
                window.location.replace("http://127.0.0.1:5500/front-end/build/login.html");
            }
        }
        catch (err) {
            alert('Erro criar usuário');
            console.log(err);
        }
    }
});
const validFields = () => {
    let result = true;
    for (const key of keys) {
        let input = inputs[key];
        let feedbackField = document.querySelector(`#${input.name}Feedback`);
        if (input.input.value === "") {
            feedbackField.innerText = `O campo ${input.name} precisa ser preenchido`;
            feedbackField.classList.add('invalid-feedback');
            feedbackField.classList.remove('valid-feedback');
            input.input.classList.add('is-invalid');
            input.input.classList.remove('is-valid');
            result = false;
        }
        else {
            feedbackField.innerText = `Tudo certo!!!`;
            feedbackField.classList.add('valid-feedback');
            feedbackField.classList.remove('invalid-feedback');
            input.input.classList.add('is-valid');
            input.input.classList.remove('is-invalid');
        }
        if (!input.valid) {
            result = false;
        }
    }
    return result;
};
const togglePassword = (element) => {
    element.classList.add('hide');
    element.classList.remove('show');
    if (element.id === 'exibir') {
        let el = document.querySelector('#ocultar');
        el.classList.add('show');
        el.classList.remove('hide');
        inputs.inputPassword.input.type = 'text';
        inputs.inputConfirmPassword.input.type = 'text';
    }
    else {
        let el = document.querySelector('#exibir');
        el.classList.add('show');
        el.classList.remove('hide');
        inputs.inputPassword.input.type = 'password';
        inputs.inputConfirmPassword.input.type = 'password';
    }
};
const inputs = {
    inputEmail: {
        input: document.querySelector('#inputEmail'),
        validate: emailValidation,
        name: 'email',
        valid: false,
    },
    inputUsername: {
        input: document.querySelector('#inputUsername'),
        validate: usernameValidation,
        name: 'username',
        valid: false,
    },
    inputName: {
        input: document.querySelector('#inputName'),
        validate: null,
        name: 'name',
        valid: true,
    },
    inputPassword: {
        input: document.querySelector('#inputPassword'),
        validate: passwordValidation,
        name: 'password',
        valid: false,
    },
    inputConfirmPassword: {
        input: document.querySelector('#inputConfirmPassword'),
        validate: validateEqualPassword,
        name: 'confirmPassword',
        valid: false,
    },
};
const keys = Object.keys(inputs);
keys.forEach(key => {
    if (inputs[key].validade) {
        inputs[key].input.addEventListener('keyup', (event) => {
            let result = inputs[key].validate(event.currentTarget.value, inputs[key].name);
        });
    }
});
window.addEventListener('load', () => {
    const user = window.localStorage.getItem('user');
    if (user) {
        window.location.replace("http://127.0.0.1:5500/front-end/build/index.html");
    }
});
