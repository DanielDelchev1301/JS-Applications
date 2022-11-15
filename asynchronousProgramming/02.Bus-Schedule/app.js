function solve() {

    const infoElement = document.querySelector('.info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    function depart() {

        departButton.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                stop = Object.assign(data);
                infoElement.textContent = `Next stop ${stop.name}`;
            })
            .catch(error => console.log(error));
        arriveButton.disabled = false;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();