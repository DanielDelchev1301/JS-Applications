import { html } from '../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';
import page from '../node_modules/page/page.mjs';

const baseUrl = 'http://localhost:3030/data/albums';
const root = document.getElementById('main-content');

const editTemplate = (album, editHandler) => html`
        <section class="editPage">
            <form @submit=${editHandler}>
                <fieldset>
                    <legend>Edit Album</legend>
        
                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value=${album.name}>
        
                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${album.imgUrl}>
        
                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value=${album.price}>
        
                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${album.releaseDate}>
        
                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value=${album.artist}>
        
                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value=${album.genre}>
        
                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10" cols="10">${album.description}</textarea>
        
                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;

export function editView(ctx) {
    fetch(`${baseUrl}/${ctx.params.albumId}`)
        .then(res => res.json())
        .then(album => {
            ctx.render(editTemplate(album, editHandler), root);
        })


    function editHandler(e) {
        e.preventDefault();

        let token = JSON.parse(authService.getUser()).accessToken;
        const album = Object.fromEntries(new FormData(e.currentTarget));

        fetch(`${baseUrl}/${ctx.params.albumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                name: album.name,
                imgUrl: album.imgUrl,
                price: album.price,
                releaseDate: album.releaseDate,
                artist: album.artist,
                genre: album.genre,
                description: album.description,
            })
        })
        .then(res => res.json())
        .then(album => {
            page.redirect(`/albums/${album._id}`);
            confirm('are you sure?');
        })
        .catch(error => alert(error));
    }
}
