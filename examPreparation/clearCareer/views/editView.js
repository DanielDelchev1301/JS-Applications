import page from '../node_modules/page/page.mjs';
import { html } from '../node_modules/lit-html/lit-html.js';
import { getOne, getUser } from '../services/service.js';

const mainRoot = document.getElementById('main-content');
const baseUrl = 'http://localhost:3030/data/offers';

const editTemplate = (editHandler, offer) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${editHandler}>
            <input type="text" name="title" id="job-title" placeholder="Title" value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${offer.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${offer.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export function editView(ctx) {
    const id = ctx.params.offerId;

    getOne(id)
        .then(offer => {
            console.log(offer);
            ctx.render(editTemplate(editHandler, offer), mainRoot);
        });

    function editHandler(e) {
        e.preventDefault();
        const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.currentTarget));
        const token = JSON.parse(getUser())?.accessToken;

        if (title != '' && imageUrl != '' && category != ''
            && description != '' && requirements != '' && salary != '') {
            fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    category,
                    description,
                    requirements,
                    salary
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