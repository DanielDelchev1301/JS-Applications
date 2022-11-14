import { html } from '../node_modules/lit-html/lit-html.js';
import { getAllMyBooks, getUser } from '../services/service.js';

const root = document.getElementById('site-content');

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0
    ? html`
    <ul class="my-books-list">
        ${books.map(book => bookCardTemplate(book))}
    </ul>
    `
    : html`
    <p class="no-books">No books in database!</p>
    `}
</section>
`;

const bookCardTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>
`;

export function myBooksView(ctx) {
    const id = JSON.parse(getUser())._id;
    getAllMyBooks(id)
        .then(books => {
            ctx.render(myBooksTemplate(books), root);
        })
        .catch(error => alert(error));
}