import { showTopics } from "./showTopics.js";

const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const titleElement = document.getElementById('topicName');
const usernameElement = document.getElementById('username');
const postElement = document.getElementById('postText');
const submitButton = document.querySelector('.public');
const cancelButton = document.querySelector('.cancel');
showTopics();

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (titleElement.value != '' && usernameElement.value != '' && postElement.value != '') {
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleElement.value,
                username: usernameElement.value,
                post: postElement.value
            })
        })
            .then(response => response.json())
            .then(data => {
                showTopics();
                titleElement.value = '';
                usernameElement.value = '';
                postElement.value = '';
            })
            .catch(error => console.log(error));
    }
});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    titleElement.value = '';
    usernameElement.value = '';
    postElement.value = '';
});