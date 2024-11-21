import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2>Current Weather</h2>
      <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
      <p><strong>Weather:</strong> {weatherData.weathercode}</p>
      <p><strong>Wind Speed:</strong> {weatherData.windspeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
