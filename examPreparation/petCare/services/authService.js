import page from '../node_modules/page/page.mjs';

const loginUrl = 'http://localhost:3030/users/login';
const registerUrl = 'http://localhost:3030/users/register';
const getAllUrl = 'http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name';
const baseUrl = 'http://localhost:3030/data/pets';

export function isAuthenticated() {
    return Boolean(localStorage.getItem('user'));
}

export function getUser() {
    return localStorage.getItem('user');
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
                page.redirect('/');
            })
            .catch(error => alert(error.message));
    } else {
        alert('Every field have to be filled!');
    }
}

export function registerHandler(e) {
    e.preventDefault();
    const { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

    if (email != '' && password != '' && repeatPassword != ''
        && password == repeatPassword) {

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
                page.redirect('/');
            })
            .catch(error => alert(error.message));
    }

}


export function getAll() {
    return fetch(getAllUrl)
        .then(res => res.json());
}

export function createHandler(e) {
    e.preventDefault();
    const token = JSON.parse(getUser())?.accessToken;
    const { name, breed, age, weight, image, _id } = Object.fromEntries(new FormData(e.currentTarget));

    if (name != '' && breed != '' && age != ''
        && weight != '' && image != '') {

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                name,
                breed,
                age,
                weight,
                image,
                _id
            })
        })
            .then(res => res.json())
            .then(() => page.redirect('/'))
            .catch(error => alert(error.message));
    } else {
        alert('Every field have to be filled!');
    }
}

export function getOnePet(id) {
    return fetch(`${baseUrl}/${id}`)
        .then(res => res.json());
}