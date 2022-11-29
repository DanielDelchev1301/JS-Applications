import { html, render } from '../node_modules/lit-html/lit-html.js';

const rootElement = document.getElementById('root');
const input = document.getElementById('towns');
const button = document.getElementById('btnLoadTowns');

const template = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`;

button.addEventListener('click', loadTowns);

function loadTowns(event) {
    event.preventDefault();

    if (input.value != '') {
        const result =  template(input.value.split(', '));
        render(result, rootElement);
        input.value = '';
    }
}