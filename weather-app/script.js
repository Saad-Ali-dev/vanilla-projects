const APIKEY = "170fcf906eb440bc6bb3b02301f280f2";

// Helper function to convert Kelvin to Celsius
function KtoC(K) {
    return Math.floor(K - 273.15);
}

// Helper function to get day name
function getDayName(date) {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
}

async function fetchWeatherAndForecast(location) {
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`
        );
        const weatherData = await weatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKEY}`
        );
        const forecastData = await forecastResponse.json();

        updateUI(weatherData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateUI(weatherData, forecastData) {
    // Update current weather
    document.querySelector('.temperature').textContent = `${KtoC(weatherData.main.temp)}°`;
    document.querySelector('.location').textContent = weatherData.name;
    document.querySelector('.description').textContent = weatherData.weather[0].main;

    // Update forecast
    const dailyForecasts = forecastData.list.filter(forecast => 
        forecast.dt_txt.includes('12:00:00')
    ).slice(0, 3);

    const forecastElements = document.querySelectorAll('.forecast-day');
    
    dailyForecasts.forEach((forecast, index) => {
        const dayElement = forecastElements[index];
        const tempC = KtoC(forecast.main.temp);
        
        dayElement.querySelector('span:first-child').textContent = getDayName(forecast.dt_txt);
        dayElement.querySelector('.forecast-temp').textContent = `${tempC}°`;
        
        // Update weather icon based on conditions
        const weatherCode = forecast.weather[0].id;
        let icon = '🌥️'; // default cloudy
        if (weatherCode < 300) icon = '⛈️'; // thunderstorm
        else if (weatherCode < 500) icon = '🌧️'; // drizzle
        else if (weatherCode < 600) icon = '🌧️'; // rain
        else if (weatherCode < 700) icon = '🌨️'; // snow
        else if (weatherCode === 800) icon = '☀️'; // clear
        
        dayElement.querySelector('.forecast-icon').textContent = icon;
    });
}

// Initialize with London weather
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherAndForecast('London');
});

// Handle location addition
document.querySelector('.add-location').addEventListener('click', () => {
    const location = prompt('Enter city name:');
    if (location) {
        fetchWeatherAndForecast(location);
    }
});
