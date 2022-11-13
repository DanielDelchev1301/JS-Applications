import { html, nothing} from '../node_modules/lit-html/lit-html.js';
import { isAuthenticated } from '../services/authService.js';

const url = 'http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name';
const root = document.getElementById('main-content');

let isEmpty = false;

const catalogTemplate = (cardTemplate, isEmpty) => html`
        <section id="catalogPage">
            <h1>All Albums</h1>
            ${isEmpty
                ? html`<p>No Albums in Catalog!</p>`
                : cardTemplate}
        </section>
`;

const cardTemplate = (data, isAuthenticated) => html`
    ${data.map(each => html`
    <div class="card-box">
        <img src=${each.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${each.name}</p>
                <p class="artist">Artist: ${each.artist}</p>
                <p class="genre">Genre: ${each.genre}</p>
                <p class="price">Price: ${each.price}</p>
                <p class="date">Release Date: ${each.releaseDate}</p>
            </div>
            ${isAuthenticated 
                ? html`
                <div class="btn-group">
                    <a href="/albums/${each._id}" id="details">Details</a>
                </div>
                `
                : nothing}
        </div>
    </div>
    `)}
`;

export function catalogView(ctx) {

    function getAll() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.length == 0) {
                    isEmpty = true;
                    ctx.render(catalogTemplate(), root);
                } else {
                    isEmpty = false;
                    ctx.render(catalogTemplate(cardTemplate(data, isAuthenticated())), root);
                }
            })
            .catch(error => alert(error.message));
    }

    getAll();
}