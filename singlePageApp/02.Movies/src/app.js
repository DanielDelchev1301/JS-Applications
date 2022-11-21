import { router } from "./router.js";
import { updateNavigation } from "./util.js";

const navigation = document.querySelector('#container .navbar.navbar-expand-lg.navbar-dark.bg-dark ');
export const user = localStorage.getItem('user');

navigation.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {

        if (e.target.href) {
            const url = new URL(e.target);
            router(url.pathname);
        }

    }
});

updateNavigation(user);