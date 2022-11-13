import { html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

const root = document.getElementById('main-content');
const url = 'http://localhost:3030/users/register';

const registerTemplate = (registerHandler) => html`
        <section id="registerPage">
            <form @submit=${registerHandler}>
                <fieldset>
                    <legend>Register</legend>
        
                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">
        
                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">
        
                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="confPass" name="confPass" type="password" placeholder="Confirm Password">
        
                    <button type="submit" class="register">Register</button>
        
                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export function registerView(ctx) {
    ctx.render(registerTemplate(registerHandler), root);

}

function registerHandler(e) {
    e.preventDefault();
    let { email, password, confPass } = Object.fromEntries(new FormData(e.currentTarget));

    if (password == confPass && email != ''
        && password != '' && confPass != '') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    page.redirect('/');
                })
                .catch(error => alert(error.message));
        }
}