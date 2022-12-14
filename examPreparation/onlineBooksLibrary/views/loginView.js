import { html } from '../node_modules/lit-html/lit-html.js';
import { loginHandler } from '../services/service.js';

const root = document.getElementById('site-content');

const loginTemplate = (loginHandler) => html`
<section id="login-page" class="login">
    <form id="login-form" @submit=${loginHandler}>
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(loginHandler), root);
}