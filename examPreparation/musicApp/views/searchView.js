import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";

const root = document.getElementById('main-content');
const baseUrl = 'http://localhost:3030/data/albums';

const searchTemplate = (searchHandler, album) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click=${searchHandler}>Search</button>
            </div>
        
            <h2>Results:</h2>
        
            <div class="search-result">
            ${album.lenght > 0
                ? album.map(x => albumTemplate(x))
                : html`<p class="no-result">No result.</p>`}
            </div>
        
        </section>
`;

export function searchView(ctx) {
    ctx.render(searchTemplate(searchHandler, []), root);
    
    function searchHandler() {
        const input = document.getElementById('search-input');
        
        if (input.value != '') {
            let query = encodeURIComponent(`name LIKE "${input.value}"`);
            
            fetch(`${baseUrl}?where=${query}`)
            .then(res => res.json())
            .then(data => {
                ctx.render(searchTemplate(searchHandler, data), root);
            });
        } else {
            alert('Cannot do empty search!');
        }
    }
}


const albumTemplate = (album) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isAuthenticated
                ? html`
                    <div class="btn-group">
                        <a href="/albums/${album._id}" id="details">Details</a>
                    </div>
                `
                : nothing}
        </div>
    </div>
`;