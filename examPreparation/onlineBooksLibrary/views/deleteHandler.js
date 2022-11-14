import page from '../node_modules/page/page.mjs';
import { getUser } from '../services/service.js';

const baseUrl = 'http://localhost:3030/data/books';

export function deleteHandler(ctx) {
    const id = ctx.params.bookId;
    const token = JSON.parse(getUser())?.accessToken;

    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })
        .then(res => res.json())
        .then(() => {
            page.redirect('/dashboard');
        })
        .catch(error => alert(error));
}