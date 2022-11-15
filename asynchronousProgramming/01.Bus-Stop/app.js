function getInfo() {
    const inputElement = document.getElementById('stopId');
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    const ulForBuses = document.getElementById('buses');
    const divStopName = document.getElementById('stopName');

    fetch(`${baseUrl}/${inputElement.value}`)
        .then(response => response.json())
        .then(data => {
            const buses = data.buses;
            const name = data.name;
            divStopName.textContent = name;
            ulForBuses.innerHTML = '';
            Object.keys(buses).forEach(bus => {
                const liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
                ulForBuses.appendChild(liElement);
            });
        })
        .catch(error => {
            divStopName.textContent = 'Error';
            ulForBuses.innerHTML = ''; 
        });
}