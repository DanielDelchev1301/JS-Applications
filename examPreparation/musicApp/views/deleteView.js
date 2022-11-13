import * as authService from '../services/authService.js';
import page from '../node_modules/page/page.mjs';

const url = 'http://localhost:3030/data/albums';

export function deleteView(ctx) {
    let token = JSON.parse(authService.getUser()).accessToken;
    if (confirm('Are you sure you want to delete this album?')) {
        fetch(`${url}/${ctx.params.albumId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        })
            .then(res => res.json())
            .then(() => {
                page.redirect('/catalog');
            });
    }
}