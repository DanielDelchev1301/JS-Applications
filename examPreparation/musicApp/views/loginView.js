import { html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

const root = document.getElementById('main-content');
const url = 'http://localhost:3030/users/login';

const loginTemplate = (loginHandler) => html`
        <section id="loginPage">
            <form @submit=${loginHandler}>
                <fieldset>
                    <legend>Login</legend>
        
                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">
        
                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">
        
                    <button type="submit" class="login">Login</button>
        
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(loginHandler), root);
}

function loginHandler(e) {
    e.preventDefault();
    let {email, password} = Object.fromEntries(new FormData(e.currentTarget));

    if (email != '' && password != '') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                page.redirect('/');
            })
            .catch(error => alert(error.message));
    }
    
}