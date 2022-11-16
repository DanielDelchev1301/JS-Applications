function attachEvents() {
    let textArea = document.getElementById('messages');
    const nameElement = document.querySelector('input[name="author"]');
    const messageElement = document.querySelector('input[name="content"]');
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
    const url = 'http://localhost:3030/jsonstore/messenger';

    sendButton.addEventListener('click', (e) => {
        const data = {
            author: nameElement.value,
            content: messageElement.value
        }
        if (nameElement.value != '' && messageElement.value != '') {
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }

        load();

        nameElement.value = '';
        messageElement.value = '';
    });

    refreshButton.addEventListener('click', (e) => {
        load();
    });
    
    function load() {
        
        let result = '';
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.values(data).forEach(x => {
                    result += `${x.author}: ${x.content}\n`;
                });
                textArea.textContent = result;
            })
            .catch(error => console.log(error));
    }

}
attachEvents();