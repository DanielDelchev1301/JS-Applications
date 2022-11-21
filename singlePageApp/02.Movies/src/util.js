import { home } from "./home.js";
import { router } from "./router.js";

const sections = document.querySelectorAll('.view-section');
const welcomeLink = document.getElementById('welcome-link');
const loginLink = document.getElementById('login-link');
export const logoutLink = document.getElementById('logout-link');
const registerLink = document.getElementById('register-link');
const addMovieButton = document.getElementById('add-movie-button');

export function hideAll() {
    sections.forEach(s => {s.style.display = 'none'});
}

export function updateNavigation(user) {
    let parsed = JSON.parse(user);
    console.log(parsed);
    if (parsed) {
        home();
        addMovieButton.style.display = 'block';
        welcomeLink.style.display = 'block';
        logoutLink.style.display = 'block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        welcomeLink.textContent = `Welcome, ${parsed.email}`;

        addMovieButton.addEventListener('click', (e) => {
            router('/addMovie');
        });
    } else {
        addMovieButton.style.display = 'none';
        welcomeLink.style.display = 'none';
        logoutLink.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
    }
}