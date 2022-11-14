import { html } from '../node_modules/lit-html/lit-html.js';
import * as service from '../services/service.js';

const navRoot = document.getElementById('site-header');

const guests = html`
<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>
`;

const users = (user) => html`
<div id="user">
    <span>Welcome, ${user.email}</span>
    <a class="button" href="/myBooks">My Books</a>
    <a class="button" href="/addBook">Add Book</a>
    <a class="button" href="/logout">Logout</a>
</div>
`;

const navigationTemplate = (isAuthenticated, user) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/dashboard">Dashboard</a>
        ${isAuthenticated
        ? users(user)
        : guests}
    </section>
</nav>
`;

export function navigationMiddleware(ctx, next) {
    ctx.render(navigationTemplate(service.isAuthenticated(), JSON.parse(service.getUser())), navRoot);

    next();
}