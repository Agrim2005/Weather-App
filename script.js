// Using Open-Meteo API (No API key required!)
// This makes the project immediately usable for your portfolio

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// Listen for click on search button
searchBtn.addEventListener('click', handleSearch);

// Listen for "Enter" key in input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;

    // Reset UI state
    weatherDisplay.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        // Step 1: Geocoding (Convert city name to Latitude & Longitude)
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const locationName = `${location.name}${location.country ? ', ' + location.country : ''}`;

        // Step 2: Fetch Weather Data using coordinates
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        // Step 3: Update the UI
        updateUI(locationName, weatherData.current_weather);

    } catch (error) {
        console.error("Error fetching data:", error);
        loading.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

function updateUI(locationName, current) {
    // Hide loading, show weather card
    loading.classList.add('hidden');
    weatherDisplay.classList.remove('hidden');

    // Populate data
    document.getElementById('cityName').innerText = locationName;
    document.getElementById('tempValue').innerText = Math.round(current.temperature);
    document.getElementById('windSpeed').innerText = `${current.windspeed} km/h`;
    document.getElementById('windDir').innerText = `${current.winddirection}°`;
    
    // Convert WMO Weather code to readable text
    document.getElementById('weatherCondition').innerText = getWeatherDescription(current.weathercode);
}

// Helper function to map Open-Meteo weather codes to descriptions
function getWeatherDescription(code) {
    const codes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        95: 'Thunderstorm'
    };
    return codes[code] || 'Unknown conditions';
}