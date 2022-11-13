import page from '../node_modules/page/page.mjs';

const url = 'http://localhost:3030/users/logout';

export function logoutView() {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;

    fetch(url, {
        method: 'GET',
        headers: {
            "X-Authorization": token 
        }
    })
        .then(res => {
            if (res.status == '204') {
                localStorage.clear();
                page.redirect('/');
            }
        });
}