const homeSection = document.getElementById('home-page');

export function home() {
    homeSection.style.display = 'block';
}

const user = localStorage.getItem('user');