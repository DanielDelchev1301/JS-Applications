import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';

const baseUrl = 'http://localhost:3030/data/albums';
const root = document.getElementById('main-content');

const detailsTemplate = (album, user) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${user._id == album._ownerId
                ?
                html`<div class="actionBtn">
                        <a href="/albums/${album._id}/edit" class="edit">Edit</a>
                        <a href="/albums/${album._id}/delete" class="remove">Delete</a>
                    </div>`
                : nothing
            }
        </div>
    </div>
</section>
`;

export function detailsView(ctx) {

    const id = ctx.params.albumId;
    fetch(`${baseUrl}/${id}`)
        .then(res => res.json())
        .then(album => {
            ctx.render(detailsTemplate(album, JSON.parse(authService.getUser())), root);
        })
        .catch(error => alert(error));
}