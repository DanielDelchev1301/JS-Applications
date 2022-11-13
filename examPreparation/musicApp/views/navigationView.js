import { html } from '../node_modules/lit-html/lit-html.js';

const guest = html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
`;

const user = html`
    <li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>
`;

export const navigationTemplate = (isAuthenticated) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/">Home</a>
    <ul>
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        ${isAuthenticated
            ? user
            : guest
        }
    </ul>
</nav>
`;