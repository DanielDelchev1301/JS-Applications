import { login } from "./login.js";
import { logoutLink, updateNavigation } from "./util.js";

export function logout() {
    logoutLink.addEventListener('click', (e) => {
        localStorage.removeItem('user');
        const user = localStorage.getItem('user');
        updateNavigation(user);
        login();
    }); 
}