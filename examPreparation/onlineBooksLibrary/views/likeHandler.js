import { html } from '../node_modules/lit-html/lit-html.js';
import { addLike } from '../services/service.js';
import page from '../node_modules/page/page.mjs';

const likeButton = document.getElementById('like-button');

export function likeHandler(ctx) {
    const id = ctx.params.bookId;

    addLike(id)
        .then(() => {
            likeButton.style.display = 'none';
            page.redirect(`/details/${id}`);

        });
}