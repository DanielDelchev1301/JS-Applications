import { getUser } from "../services/service.js";
import page from '../node_modules/page/page.mjs';

const logoutUrl = 'http://localhost:3030/users/logout';

export function logoutHandler() {
    const token = JSON.parse(getUser())?.accessToken;

    fetch(logoutUrl, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
        .then(() => {
            localStorage.clear();
            page.redirect('/dashboard');
        });
}