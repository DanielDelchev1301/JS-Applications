import { html } from '../node_modules/lit-html/lit-html.js';
import * as authService from '../services/authService.js';

const navRoot = document.getElementById('navigation-content');

const guests = html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
`;

const users = html`
    <li><a href="/create">Create Postcard</a></li>
    <li><a href="/logout">Logout</a></li>
`;

const navigationTemplate = (isAuthenticated) => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        ${isAuthenticated
        ? users
        : guests}
    </ul>
</nav>
`;

export function navigationMiddleware(ctx, next) {
    ctx.render(navigationTemplate(authService.isAuthenticated()), navRoot);

    next();
}