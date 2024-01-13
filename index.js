document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '9a0eda7760a3661bb103a7b70777fda0';
    const defaultCity = 'Boston';

    const kelvinToFahrenheit = (kelvin) => (kelvin - 273.15) * 9/5 + 32;

    const updateWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const weatherData = await response.json();

            const weatherContainer = document.getElementById('weatherContainer');
            const temperatureElement = document.getElementById('temperature');

            const temperatureFahrenheit = kelvinToFahrenheit(weatherData.main.temp);

            weatherContainer.innerHTML = `
                <h2>Weather in ${weatherData.name}</h2>
                <p id="temperature">Temperature: ${temperatureFahrenheit.toFixed(2)} °F</p>
                <p id="weatherDescription">Weather: ${weatherData.weather[0].description}</p>
            `;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const searchForm = document.getElementById('searchForm');

    // Search form submit event
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const city = formData.get('city');
        if (city) {
            updateWeather(city);
        }
    });

    // Function to update weather and set timeout for the next update
    const updateWeatherWithTimeout = async () => {
        await updateWeather(defaultCity);
        setTimeout(updateWeatherWithTimeout, 60000); // Update every minute
    };

    // Initial load and start the auto-update loop
    updateWeatherWithTimeout();
});

