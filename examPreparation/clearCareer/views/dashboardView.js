import { html } from '../node_modules/lit-html/lit-html.js';
import { getAll } from '../services/service.js';

const mainRoot = document.getElementById('main-content');

const dashboardTemplate = (offers) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    ${offers.length > 0
    ? offers.map(offer => offerTemplate(offer))
    : html`<h2>No offers yet.</h2>`}

</section>
`;

const offerTemplate = (offer) => html`
    <div class="offer">
        <img src=${offer.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/details/${offer._id}">Details</a>
    </div>
`;

export function dashboardView(ctx) {
    getAll()
        .then(offers => {
            ctx.render(dashboardTemplate(offers), mainRoot);
        })
        .catch(error => alert(error.message));
}