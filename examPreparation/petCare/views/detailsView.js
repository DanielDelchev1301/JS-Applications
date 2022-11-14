import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { getOnePet, getUser } from '../services/authService.js';

const root = document.getElementById('content');

const detailsTemplate = (pet, user) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            ${user
            ? html`
            <div class="actionBtn">
                ${user._id == pet._ownerId
                ? html`
                <a href="/details/${pet._id}/edit" class="edit">Edit</a>
                <a href="/details/${pet._id}/remove" class="remove">Delete</a>
                `
                : html`<a href="/details/${pet._id}/donate" class="donate">Donate</a>`}
            </div>
            `
            : nothing}
        </div>
    </div>
</section>
`;

export function detailsView(ctx) {
    const id = ctx.params.petId;
    getOnePet(id)
        .then(pet => {
            ctx.render(detailsTemplate(pet, JSON.parse(getUser())), root);
        })
        .catch(error => alert(error.message));
}