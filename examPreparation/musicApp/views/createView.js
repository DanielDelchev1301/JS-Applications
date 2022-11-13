import { html } from '../node_modules/lit-html/lit-html.js';
import { getUser } from '../services/authService.js';
import page from '../node_modules/page/page.mjs';

const root = document.getElementById('main-content');
const url = 'http://localhost:3030/data/albums';

const createTemplate = (createHandler) => html`
        <section class="createPage">
            <form @submit=${createHandler}>
                <fieldset>
                    <legend>Add Album</legend>
        
                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" placeholder="Album name">
                        
                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">
                        
                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" placeholder="Price">
                        
                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">
        
                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">
                        
                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">
                        
                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" placeholder="Description"></textarea>
        
                        <button class="add-album" type="submit">Add New Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
        `;

export function createView(ctx) {
    ctx.render(createTemplate(createHandler), root);
}

function createHandler(e) {
    e.preventDefault();

    let {name, imgUrl, price, releaseDate, artist, genre, description} = Object.fromEntries(new FormData(e.currentTarget));

    if (name != '' && imgUrl != '' && price != '' && releaseDate != '' 
    && artist != '' && genre != '' && description != '') {

        const user = JSON.parse(getUser());

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                name,
                imgUrl,
                price,
                releaseDate,
                artist,
                genre,
                description
            })
        })
            .then(res => res.json())
            .then(() => {
                page.redirect('/catalog');
            })
            .catch(error => alert(error));
    } else {
        alert('Every field have to be filled!');
    }
}