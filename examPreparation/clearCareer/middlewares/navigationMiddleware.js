import { html } from '../node_modules/lit-html/lit-html.js';
import * as service from '../services/service.js';

const navRoot = document.getElementById('navigation-content');

const guests = html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`;

const users = html`
<div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
</div>
`;

const navigationTemplate = (isAuthenticated) => html`
        <!-- Navigation -->
        <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
        
        <nav>
            <div>
                <a href="/dashboard">Dashboard</a>
            </div>
        
            ${isAuthenticated
            ? users
            : guests }
        </nav>
`;

export function navigationMiddleware(ctx, next) {
    ctx.render(navigationTemplate(service.isAuthenticated()), navRoot);

    next();
}