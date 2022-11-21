import { hideAll } from "./util.js";
import { home } from "./home.js";
import { updateNavigation } from "./util.js";

const loginSection = document.getElementById('form-login');
const formElement = loginSection.querySelector('.text-center.border.border-light.p-5');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const url = 'http://localhost:3030/users/login';

export function login() {
    loginSection.style.display = 'block';
    emailInput.value = '';
    passwordInput.value = '';
}


formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.email) {
                localStorage.setItem('user', JSON.stringify(data));
                const user = localStorage.getItem('user');
                hideAll();
                home();
                updateNavigation(user);
            } else {
                alert('Wrong email or password!');
                emailInput.value = '';
                passwordInput.value = '';
            }
        })
        .catch(error => console.log(error));
});
