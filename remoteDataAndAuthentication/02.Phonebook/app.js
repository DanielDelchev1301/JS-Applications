function attachEvents() {
    let ulElement = document.getElementById('phonebook');
    let personElement = document.getElementById('person');
    let phoneElement = document.getElementById('phone');
    let loadButton = document.getElementById('btnLoad');
    let createButton = document.getElementById('btnCreate');
    const url = 'http://localhost:3030/jsonstore/phonebook';

    loadButton.addEventListener('click', (e) => {
        e.preventDefault();

        ulElement.innerHTML = '';
        load();
    });


    function options(data) {
        return {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    }

    createButton.addEventListener('click', (e) => {
        e.preventDefault();

        let data = {
            person: personElement.value,
            phone: phoneElement.value
        }

        if (personElement.value !== '' && phoneElement.value !== '') {
            fetch(url, options(data))
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }

        ulElement.innerHTML = '';

        load();

        personElement.value = '';
        phoneElement.value = '';
    });

    function load() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.values(data).forEach(x => {
                    let liElement = document.createElement('li');
                    let button = document.createElement('button');
                    liElement.textContent = `${x.person}: ${x.phone}`;
                    button.textContent = 'Delete';
                    liElement.appendChild(button);
                    ulElement.appendChild(liElement);

                    button.addEventListener('click', (e) => {
                        ulElement.removeChild(liElement);

                        fetch(`${url}/${x._id}`, { method: 'DELETE' })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error));
                    });

                });
            })
            .catch(error => console.log(error));
    }
}
attachEvents();