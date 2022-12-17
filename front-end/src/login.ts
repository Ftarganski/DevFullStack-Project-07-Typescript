const login = async () => {
    const userEmail: any = document.querySelector('#inputUserEmail')
    const password: any = document.querySelector('#inputPassword')

    const data = {
        userEmail: userEmail.value,
        password: password.value,
    };

    const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    alert(result.msg);
    if(response.status === 200){
        window.localStorage.setItem('user', JSON.stringify(result.user));
        window.location.replace("http://127.0.0.1:5500/front-end/build/index.html");
    }
}

window.addEventListener('load', () => {
    const user = window.localStorage.getItem('user');
    if(user){
        window.location.replace("http://127.0.0.1:5500/front-end/build/index.html");
    }
})