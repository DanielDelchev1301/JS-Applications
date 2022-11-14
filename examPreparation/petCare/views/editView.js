import page from '../node_modules/page/page.mjs';
import { html } from '../node_modules/lit-html/lit-html.js';
import { getOnePet, getUser } from '../services/authService.js';

const root = document.getElementById('content');
const baseUrl = 'http://localhost:3030/data/pets';

const editTemplate = (editHandler, pet) => html`
<section id="editPage">
    <form class="editForm" @submit=${editHandler}>
        <img src=${pet.image}>
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value=${pet.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
            <div name="id" value=${pet._id}></div>
        </div>
    </form>
</section>
`;

export function editView(ctx) {
    const id = ctx.params.petId;
    getOnePet(id)
        .then(pet => {
            ctx.render(editTemplate(editHandler, pet), root);
        });

    function editHandler(e) {
        e.preventDefault();
        const { name, breed, age, weight, image } = Object.fromEntries(new FormData(e.currentTarget));
        const token = JSON.parse(getUser())?.accessToken;

        if (name != '' && breed != '' && age != ''
            && weight != '' && image != '') {
            return fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({
                    name,
                    breed,
                    age,
                    weight,
                    image
                })
            })
                .then(res => res.json())
                .then(() => {
                    page.redirect(`/details/${id}`);
                })
                .catch(error => alert(error.message));
        } else {
            alert('Every field have to be filled!');
        }
    }
}