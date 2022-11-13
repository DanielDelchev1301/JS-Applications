export function isAuthenticated() {
    const user = localStorage.getItem('user');
    return Boolean(user);
}

export function getUser() {
    return localStorage.getItem('user');
}