# Weather Finder App 🌤️

A responsive, real-time weather application built to provide instant weather forecasts for cities worldwide. This project demonstrates proficiency in front-end web development, asynchronous JavaScript, and third-party API integration.

## 🚀 Features

* **Real-Time Data:** Fetches live weather conditions, temperature, wind speed, and wind direction.
* **Geocoding Integration:** Converts user-inputted city names into geographical coordinates automatically.
* **Responsive Design:** A modern, glass-morphism UI that adapts seamlessly to desktop and mobile screens.
* **Error Handling:** Gracefully handles invalid inputs and network errors with clear, user-friendly messages.
* **No API Key Required:** Utilizes the open-source Open-Meteo API, making the project instantly usable without rate limits or registration walls.

## 🛠️ Technologies Used

* **HTML5:** Semantic structuring of the user interface.
* **CSS3:** Custom styling featuring Flexbox/Grid layouts, CSS variables, animations, and backdrop filters for a glass effect.
* **JavaScript (ES6+):** Core logic handling DOM manipulation, event listeners, and asynchronous API calls using `fetch` and `async/await`.
* **APIs:** 
  * [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) (City search)
  * [Open-Meteo Weather API](https://open-meteo.com/) (Forecast data)

## 📁 File Structure

```text
weather_app/
│
├── index.html    # The core structure and layout of the application
├── style.css     # The visual design, responsive layout, and animations
├── script.js     # The application logic and API integration
└── README.md     # Project documentation
