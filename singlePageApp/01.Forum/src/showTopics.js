const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
import { createTopic } from "./createTopic.js";

export function showTopics() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach(x => {
                createTopic(x);
            });
        })
        .catch(error => console.log(error));
}