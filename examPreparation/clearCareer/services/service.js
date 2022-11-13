import page from '../node_modules/page/page.mjs';

const baseUrl = 'http://localhost:3030/data';
const loginUrl = 'http://localhost:3030/users/login';
const registerUrl = 'http://localhost:3030/users/register';
const applyUrl = 'http://localhost:3030/data/applications';

export function isAuthenticated() {
    return Boolean(localStorage.getItem('user'));
}

export function getUser() {
    return localStorage.getItem('user');
}

export function getAll() {
    return fetch(`${baseUrl}/offers?sortBy=_createdOn%20desc`)
        .then(res => res.json());
}

export function getOne(id) {
    return fetch(`${baseUrl}/offers/${id}`)
        .then(res => res.json());
}

export function loginHandler(e) {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    if (email != '' && password != '') {
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                page.redirect('/dashboard');
            })
            .catch(error => alert(error.message));
    } else {
        alert('Every field have to be filled!');
    }
}

export function registerHandler(e) {
    e.preventDefault();
    const { email, password, rePassword } = Object.fromEntries(new FormData(e.currentTarget));

    if (email != '' && password != '' && rePassword != '') {

        if (password == rePassword) {

            fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    page.redirect('/dashboard');
                })
                .catch(error => alert(error.message));
        } else {
            alert('Password and Repeat Password must be the same!');
        }
    } else {
        alert('Every field have to be filed!');
    }
}

export function addOfferHandler(e) {
    e.preventDefault();

    const token = JSON.parse(getUser())?.accessToken;
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.currentTarget));

    if (title != '' && imageUrl != '' && category != ''
        && description != '' && requirements != '' && salary != '') {

        fetch(`${baseUrl}/offers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                title,
                imageUrl,
                category,
                description,
                requirements,
                salary
            })
        })
            .then(res => res.json())
            .then(() => {
                page.redirect('/dashboard')
            })
            .catch(error => alert(error.message));
    } else {
        alert('Every field have to be filled!');
    }
}

export function addApplication(id) {
    const token = JSON.parse(getUser())?.accessToken;

    return fetch(applyUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({offerId: id})
    })
        .then(res => res.json());
}

export function getTotalApplications(id) {
    return fetch(`${baseUrl}/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`)
        .then(res => res.json());
}