import { login } from "./login.js";
import { registration } from "./registration.js";
import { home } from "./home.js";
import { hideAll } from "./util.js";
import { logout } from "./logout.js";
import { addMovie } from "./addMovie.js";

const routes = {
    '/': home,
    '/logout': logout,
    '/login': login,
    '/register': registration,
    '/addMovie': addMovie
}

export function router(path) {
    hideAll();
    routes[path]();
}