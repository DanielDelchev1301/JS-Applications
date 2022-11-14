import page from '../node_modules/page/page.mjs';

const baseUrl = 'http://localhost:3030/data';
const loginUrl = 'http://localhost:3030/users/login';
const registerUrl = 'http://localhost:3030/users/register';

export function getTotalLikes(id) {
    return fetch(`${baseUrl}/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`)
        .then(res => res.json());
}

export function addLike(id) {
    const token = JSON.parse(getUser())?.accessToken;
    return fetch(`${baseUrl}/likes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({bookId: id})
    })
        .then(res => res.json());
}

export function isAuthenticated() {
    return Boolean(localStorage.getItem('user'));
}

export function getUser() {
    return localStorage.getItem('user');
}

export function getAll() {
    return fetch(`${baseUrl}/books?sortBy=_createdOn%20desc`)
        .then(res => res.json());
}

export function getAllMyBooks(id) {
    return fetch(`${baseUrl}//books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
        .then(res => res.json());
}

export function getOne(id) {
    return fetch(`${baseUrl}/books/${id}`)
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
    const { email, password, confirmPass } = Object.fromEntries(new FormData(e.currentTarget));

    if (email != '' && password != '' && confirmPass != ''
        && password == confirmPass) {

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
    }
}

export function addBookHandler(e) {
    e.preventDefault();

    const id = JSON.parse(getUser())._id;
    const token = JSON.parse(getUser())?.accessToken;
    const { title, description, imageUrl, type } = Object.fromEntries(new FormData(e.currentTarget));

    if (title != '' && description != ''
        && imageUrl != '' && type != '') {

        fetch(`${baseUrl}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                type
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