const apiKey = '1fa69928b4a64e80b436fbcf2c4f141c';
const defaultCity = 'New York';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}`;

async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl.replace('{city}', city));
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function updateWeather(city) {
    const weatherData = await fetchWeather(city);
    document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('current-weather').textContent = `Temperature: ${weatherData.main.temp}°C, Conditions: ${weatherData.weather[0].description}`;
}


window.onload = function() {
    updateWeather(defaultCity);
};

if (!response.ok) {
    throw new Error('Failed to fetch weather data');
}
