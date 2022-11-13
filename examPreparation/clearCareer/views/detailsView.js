import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { getOne, getTotalApplications, getUser, isAuthenticated } from '../services/service.js';

const mainRoot = document.getElementById('main-content');

const detailsTemplate = (offer, user, isAuthenticated, applications) => html`
          <section id="details">
            <div id="details-wrapper">
              <img id="details-img" src=${offer.imageUrl} alt="example1" />
              <p id="details-title">${offer.title}</p>
              <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
              </p>
              <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
              </p>
              <div id="info-wrapper">
                <div id="details-description">
                  <h4>Description</h4>
                  <span>${offer.description}</span
                  >
                </div>
                <div id="details-requirements">
                  <h4>Requirements</h4>
                  <span>${offer.requirements}</span
                  >
                </div>
              </div>
              <p>Applications: <strong id="applications">${applications}</strong></p>
  
              ${isAuthenticated
               ? html`
                <div id="action-buttons">
                    ${user._id == offer._ownerId
                    ? html`
                        <a href="/details/${offer._id}/edit" id="edit-btn">Edit</a>
                        <a href="/details/${offer._id}/delete" id="delete-btn">Delete</a>
                    `
                    : html`
                        <a href="/details/${offer._id}/apply" id="apply-btn">Apply</a>
                    `}
                </div>
               `
               : nothing}

          </section>
`;

export function detailsView(ctx) {
    const id = ctx.params.offerId;

    getTotalApplications(id)
        .then(applications => {
            console.log(applications);
            getOne(id)
                .then(offer => {
                    ctx.render(detailsTemplate(offer, JSON.parse(getUser()), isAuthenticated(), applications), mainRoot);
                })
                .catch(error => alert(error.message));
        });
}