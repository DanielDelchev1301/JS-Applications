function attachEvents() {
    const inputElement = document.getElementById('location');
    const getButton = document.getElementById('submit');
    const divDisplay = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');
    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';

    let code = '';

    const sunny = '&#x2600;';
    const partlySunny = '&#x26C5;';
    const overcast = '&#x2601;';
    const rain = '&#x2614;';
    const degrees = '&#176;';
    
    let divElementUpcoming = document.createElement('div');
    let divElementCurrent = document.createElement('div');

    getButton.addEventListener('click', (e) => {

        divElementUpcoming.innerHTML = '';
        divElementCurrent.innerHTML = '';
        divElementUpcoming.setAttribute('class', 'forecast-info');
        divElementCurrent.setAttribute('class', 'forecasts');

        divDisplay.style.display = 'inline';

        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(data => {
                data.forEach(x => {
                    if (x.name == inputElement.value) {
                        return code = x.code;
                    }
                });

                fetch(`${baseUrl}/today/${code}`)
                    .then(response => response.json())
                    .then(data => {

                        let spanWithSymbol = document.createElement('span');
                        let spanGroup = document.createElement('span');
                        let locationSpan = document.createElement('span');
                        let tempSpan = document.createElement('span');
                        let conditionSpan = document.createElement('span');


                        spanWithSymbol.setAttribute('class', 'condition symbol');
                        spanGroup.setAttribute('class', 'condition');
                        locationSpan.setAttribute('class', 'forecast-data');
                        tempSpan.setAttribute('class', 'forecast-data');
                        conditionSpan.setAttribute('class', 'forecast-data');

                        locationSpan.textContent = data.name;
                        tempSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
                        conditionSpan.textContent = data.forecast.condition;

                        if (data.forecast.condition == 'Sunny') {
                            spanWithSymbol.innerHTML = sunny;
                        } else if (data.forecast.condition == 'Partly sunny') {
                            spanWithSymbol.innerHTML = partlySunny;
                        } else if (data.forecast.condition == 'Overcast') {
                            spanWithSymbol.innerHTML = overcast;
                        } else if (data.forecast.condition == 'Rain') {
                            spanWithSymbol.innerHTML = rain;
                        }

                        spanGroup.appendChild(locationSpan);
                        spanGroup.appendChild(tempSpan);
                        spanGroup.appendChild(conditionSpan);
                        divElementCurrent.appendChild(spanWithSymbol);
                        divElementCurrent.appendChild(spanGroup);

                        currentDiv.appendChild(divElementCurrent);

                    })
                    .catch(error => console.log(error));

                fetch(`${baseUrl}/upcoming/${code}`)
                    .then(response => response.json())
                    .then(data => {

                        data.forecast.forEach(x => {

                            let spanGroup = document.createElement('span');
                            let symbolSpan = document.createElement('span');
                            let tempSpan = document.createElement('span');
                            let conditionSpan = document.createElement('span');

                            spanGroup.setAttribute('class', 'upcoming');
                            symbolSpan.setAttribute('class', 'symbol');
                            tempSpan.setAttribute('class', 'forecast-data');
                            conditionSpan.setAttribute('class', 'forecast-data');

                            tempSpan.innerHTML = `${x.low}${degrees}/${x.high}${degrees}`;
                            conditionSpan.textContent = x.condition;

                            if (x.condition == 'Sunny') {
                                symbolSpan.innerHTML = sunny;
                            } else if (x.condition == 'Partly sunny') {
                                symbolSpan.innerHTML = partlySunny;
                            } else if (x.condition == 'Overcast') {
                                symbolSpan.innerHTML = overcast;
                            } else if (x.condition == 'Rain') {
                                symbolSpan.innerHTML = rain;
                            }

                            spanGroup.appendChild(symbolSpan);
                            spanGroup.appendChild(tempSpan);
                            spanGroup.appendChild(conditionSpan);

                            divElementUpcoming.appendChild(spanGroup);

                            upcomingDiv.appendChild(divElementUpcoming);
                        });

                    })
                    .catch(error => console.log(error));

            })
            .catch(error => console.log(error));
    });
}

attachEvents();