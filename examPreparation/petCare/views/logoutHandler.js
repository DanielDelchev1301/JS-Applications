import { getUser } from "../services/authService.js";
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
        .then(res => {
            if (res.status == '204') {
                console.log(res.status);
                localStorage.clear();
                page.redirect('/');
            }
        });
}