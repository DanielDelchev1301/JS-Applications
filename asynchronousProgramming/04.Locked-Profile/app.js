function lockedProfile() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    let counter = 1;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach(profile => {
                let divParent = document.createElement('div');
                divParent.setAttribute('class', 'profile');

                let img = document.createElement('img');
                let labelLock = document.createElement('label');
                let inputLock = document.createElement('input');
                let labelUnlock = document.createElement('label');
                let inputUnlock = document.createElement('input');
                let labelUsername = document.createElement('label');
                let inputUsername = document.createElement('input');
                let divHiddenFields = document.createElement('div');
                let labelEmail = document.createElement('label');
                let inputEmail = document.createElement('input');
                let labelAge = document.createElement('label');
                let inputAge = document.createElement('input');
                let button = document.createElement('button');

                img.setAttribute('src', './iconProfile2.png');
                img.setAttribute('class', 'userIcon');
                inputLock.setAttribute('type', 'radio');
                inputLock.setAttribute('name', `user${counter}Locked`);
                inputLock.setAttribute('value', 'lock');
                inputLock.checked = true;
                inputUnlock.setAttribute('type', 'radio');
                inputUnlock.setAttribute('name', `user${counter}Locked`);
                inputUnlock.setAttribute('value', 'unlock');
                inputUsername.setAttribute('type', 'text');
                inputUsername.setAttribute('name', `user${counter}Username`);
                inputUsername.setAttribute('value', `${profile.username}`);
                inputUsername.disabled = true;
                inputUsername.readOnly = true;
                divHiddenFields.setAttribute('id', `user${counter}HiddenFields`);
                divHiddenFields.hidden = true;
                inputEmail.setAttribute('type', 'email');
                inputEmail.setAttribute('name', `user${counter}Email`);
                inputEmail.setAttribute('value', `${profile.email}`);
                inputEmail.disabled = true;
                inputEmail.readOnly = true;
                inputAge.setAttribute('type', 'email');
                inputAge.setAttribute('name', `user${counter}Age`);
                inputAge.setAttribute('value', `${profile.age}`);

                labelLock.textContent = 'Lock';
                labelUnlock.textContent = 'Unlock';
                labelUsername.textContent = 'Username';
                labelEmail.textContent = 'Email:';
                labelAge.textContent = 'Age:';
                button.textContent = 'Show more';

                divHiddenFields.appendChild(labelEmail);
                divHiddenFields.appendChild(inputEmail);
                divHiddenFields.appendChild(labelAge);
                divHiddenFields.appendChild(inputAge);

                divParent.appendChild(img);
                divParent.appendChild(labelLock);
                divParent.appendChild(inputLock);
                divParent.appendChild(labelUnlock);
                divParent.appendChild(inputUnlock);
                divParent.appendChild(labelUsername);
                divParent.appendChild(inputUsername);
                divParent.appendChild(divHiddenFields);
                divParent.appendChild(button);

                main.appendChild(divParent);
                counter++;

                button.addEventListener('click', (e) => {
                    if (inputUnlock.checked) {
                        divHiddenFields.hidden = false;
                        button.textContent = 'Hide it';

                        button.addEventListener('click', (e) => {
                            if (inputUnlock.checked) {
                                divHiddenFields.hidden = true;
                                button.textContent = 'Show more';
                            }
                        });
                    }
                });
            });
        })
        .catch(error => console.log(error));
}