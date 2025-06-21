// src/components/WeatherCard.jsx
import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather || weather.cod !== 200) return <p style={{ color: "white" }}>City not found</p>;

  const iconMap = {
    Clear: "clear.png",
    Rain: "rain.png",
    Clouds: "clouds.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Snow: "snow.png",
    Wind: "wind.png",
    Search: "search.png",
    Humidity: "humidity.png",
  };

  const iconName = iconMap[weather.weather[0].main] || "clear.png";

  return (
    <div className="weather">
      <img
        src={`/weather_img/${iconName}`}
        className="weather-icon"
        alt={weather.weather[0].main}
      />
      <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
      <h2 className="city">{weather.name}</h2>

      <div className="details">
        <div className="col">
          <img src="/weather_img/humidity.png" alt="Humidity" />
          <div>
            <p className="humidity">{weather.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src="/weather_img/wind.png" alt="Wind" />
          <div>
            <p className="wind">{weather.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
