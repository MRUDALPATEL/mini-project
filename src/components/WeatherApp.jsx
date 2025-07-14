import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHERAPP_API_KEY;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  getWeather("Delhi");
  },[]);

  const getWeather = async (selectedCity = city) => {
    if (selectedCity.trim() === "") return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🌦️ Weather App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {weather && (
        <div className="bg-white/10 p-6 rounded shadow-md w-80 text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
