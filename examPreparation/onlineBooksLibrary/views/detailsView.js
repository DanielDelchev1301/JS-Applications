import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { getOne, getTotalLikes, getUser, isAuthenticated } from '../services/service.js';

const root = document.getElementById('site-content');

const detailsTemplate = (book, user, isAuthenticated, likes) => html`
<!-- Details Page ( for Guests and Users ) -->
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
        ${isAuthenticated
            ? html`
                ${book._ownerId == user._id
                ? html`
                <a class="button" href="/details/${book._id}/edit">Edit</a>
                <a class="button" href="/details/${book._id}/delete">Delete</a>
                `
                : html`
                <a class="button" id="like-button" href="/details/${book._id}/like" display="block">Like</a>
                `
                }
        `
        : nothing}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

export function detailsView(ctx) {
    const id = ctx.params.bookId;
    getTotalLikes(id)
        .then(likes => {

            getOne(id)
                .then(book => {
                    ctx.render(detailsTemplate(book, JSON.parse(getUser()), isAuthenticated(), likes), root);
                })
                .catch(error => alert(error.message));
        });
}