import page from '../node_modules/page/page.mjs';
import { getUser } from '../services/authService.js';

const url = 'http://localhost:3030/data/pets';

export function deleteHandler(ctx) {
    const id = ctx.params.petId;
    const token = JSON.parse(getUser())?.accessToken;
    console.log(ctx);

    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/');
        })
        .catch(error => alert(error));
}