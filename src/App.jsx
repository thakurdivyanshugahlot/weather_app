import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // Dynamic city input
  const [latLon, setLatLon] = useState({ latitude: null, longitude: null }); // Latitude and Longitude

  const API_KEY_POSITIONSTACK = "ecba28245c4079a2ab3a494365ecac9d"; // Geocoding API Key (PositionStack)
  const API_KEY_OPENMETEO = ""; // Open-Meteo does not need an API key.

  // Fetch weather data from Open-Meteo API based on latitude and longitude
  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      const data = await response.json();
      setWeather(data.current_weather);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Fetch latitude and longitude for the city using PositionStack API
  const fetchLatLon = async (cityName) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${API_KEY_POSITIONSTACK}&query=${cityName}`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch geolocation data");
      }
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const { latitude, longitude } = data.data[0];
        setLatLon({ latitude, longitude });
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Unable to fetch city coordinates");
      setWeather(null);
    }
  };

  // Handle city search from the SearchBar component
  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchLatLon(cityName); // Get latitude and longitude for the city
  };

  // Fetch weather data when latitude and longitude change
  useEffect(() => {
    if (latLon.latitude && latLon.longitude) {
      fetchWeather(latLon.latitude, latLon.longitude); // Fetch weather data
    }
  }, [latLon]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather ? (
        <WeatherCard weatherData={weather} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
