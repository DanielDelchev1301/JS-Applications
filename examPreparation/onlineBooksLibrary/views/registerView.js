import { html } from '../node_modules/lit-html/lit-html.js';
import { registerHandler } from '../services/service.js';

const root = document.getElementById('site-content');

const registerTemplate = (registerHandler) => html`
<section id="register-page" class="register">
    <form id="register-form" @submit=${registerHandler}>
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirmPass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export function registerView(ctx) {
    ctx.render(registerTemplate(registerHandler), root);
}