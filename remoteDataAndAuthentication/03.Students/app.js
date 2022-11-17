const body = document.querySelector('tbody');
const url = 'http://localhost:3030/jsonstore/collections/students';

showData();

const submitButton = document.getElementById('submit');

const firstName = document.getElementsByName('firstName')[0];
const lastName = document.getElementsByName('lastName')[0];
const facultyNumber = document.getElementsByName('facultyNumber')[0];
const grade = document.getElementsByName('grade')[0];

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (firstName.value != '' && lastName.value != ''
        && facultyNumber.value != '' && grade.value != '') {

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            })
        })
            .then(response => response.json())
            .then(data => {
                showData();
            })
            .catch(error => console.log(error));
    }
});

function showData() {
    body.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach(x => {

                let tr = document.createElement('tr');
                let firstNameTd = document.createElement('td');
                let lastNameTd = document.createElement('td');
                let facultyNumberTd = document.createElement('td');
                let gradeTd = document.createElement('td');

                firstNameTd.textContent = x.firstName;
                lastNameTd.textContent = x.lastName;
                facultyNumberTd.textContent = x.facultyNumber;
                gradeTd.textContent = x.grade;

                tr.appendChild(firstNameTd);
                tr.appendChild(lastNameTd);
                tr.appendChild(facultyNumberTd);
                tr.appendChild(gradeTd);

                body.appendChild(tr);
            });
        })
        .catch(error => console.log(error));
}