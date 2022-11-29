import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

console.log(cats);

const allCatsSection = document.getElementById('allCats');
console.log(allCatsSection);

allCatsSection.addEventListener('toggle', toggle);

const template = (cats) => html`
<ul>
    ${cats.map(cat => {html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="100">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
            `})}
        </ul>
`;

cats.forEach(cat => cat.info = false);
updateInfo();

function updateInfo() {
    const result = template(cats);
    render(result, allCatsSection);
}

function toggle(event) {
    const elementId = event.target.parentNode.querySelector('.status').id;
    const cat = cats.find(cat => cat.id == elementId);
    console.log(cat.info);
    cat.info = !cat.info;
    updateInfo();
}