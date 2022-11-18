const mainDiv = document.querySelector('.topic-title');

export function createTopic(data) {
    let containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'topic-container');
    containerDiv.setAttribute('id', data.title);
    containerDiv.innerHTML = `    <div class="topic-name-wrapper">
    <div class="topic-name">
        <a href="theme-content.html" class="normal">
            <h2>${data.title}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${new Date}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${data.username}</span></p>
                </div>
            </div>


        </div>
    </div>
</div>`;
    mainDiv.appendChild(containerDiv);
    
}