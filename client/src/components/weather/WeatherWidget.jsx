// src/components/WeatherWidget.js
import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = 'YOUR_API_KEY'; // Replace with your API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=52f9c4b90d7dfea12bef7e6cc399e355&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  return (
    <div className="weather-widget">
      <h2>Weather Search</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
