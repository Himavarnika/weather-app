const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "api-key"; 
weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.log(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError('Please enter a city');
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    card.textContent = '';
    card.style.display = 'flex';

    // Create elements
    const cityDisplay = document.createElement('h2');
    const tempDisplay = document.createElement('p');
    const feelsLikeDisplay = document.createElement('p');
    const weatherDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const pressureDisplay = document.createElement('p');
    const windSpeedDisplay = document.createElement('p');
    const weatherIcon = document.createElement('img');

    // Fill elements
    cityDisplay.textContent = `${data.name}, ${data.sys.country}`;
    tempDisplay.innerHTML = `<strong>Temperature:</strong> ${data.main.temp} °C`;
    feelsLikeDisplay.innerHTML = `<strong>Feels Like:</strong> ${data.main.feels_like} °C`;
    weatherDisplay.innerHTML = `<strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})`;
    humidityDisplay.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
    pressureDisplay.innerHTML = `<strong>Pressure:</strong> ${data.main.pressure} hPa`;
    windSpeedDisplay.innerHTML = `<strong>Wind Speed:</strong> ${data.wind.speed} m/s`;

    // Weather icon
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherIcon.classList.add('weatherIcon');

    // Append all to card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLikeDisplay);
    card.appendChild(weatherDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(pressureDisplay);
    card.appendChild(windSpeedDisplay);
    card.appendChild(weatherIcon);
}

function displayError(message) {
    card.textContent = '';
    card.style.display = 'flex';
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.appendChild(errorDisplay);
}
