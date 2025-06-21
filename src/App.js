import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import ForecastDaily from "./components/ForecastDaily";
import HourlyForecast from "./components/HourlyForecast";
import AirQuality from "./components/AirQuality";
import MapComponent from "./components/Map";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);

  const apiKey = "4eb241b7af83393993d52117f98abaad";

  const groupForecastByDay = (data) => {
    const map = new Map();
    data.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!map.has(date)) map.set(date, []);
      map.get(date).push(item);
    });

    return Array.from(map.entries())
      .slice(0, 5)
      .map(([date, items]) => {
        const temps = items.map((i) => i.main.temp);
        const weather = items[0].weather[0];
        return {
          date,
          min: Math.min(...temps),
          max: Math.max(...temps),
          icon: weather.icon,
          desc: weather.description,
        };
      });
  };

  const fetchWeatherByCity = async () => {
    if (!city) return;

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list);

      if (weatherData.coord) {
        const { lat, lon } = weatherData.coord;
        const airRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const airData = await airRes.json();
        setAirQuality(airData);
      }
    } catch (err) {
      console.error("Error fetching weather by city:", err);
    }
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list);

      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const airData = await airRes.json();
      setAirQuality(airData);
    } catch (err) {
      console.error("Error fetching weather by location:", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <img src="/imd-logo.png" alt="IMD Logo" className="imd-logo" />
          <div className="search-wrapper">
            <SearchBar
              city={city}
              setCity={setCity}
              onSearch={fetchWeatherByCity}
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div className="left-section">
          {weather && (
            <div className="weather box-hover">
              <WeatherCard weather={weather} />
            </div>
          )}
          <div className="map-container box-hover">
            <MapComponent location={weather?.coord} />
          </div>
        </div>

        <div className="right-section">
          {airQuality && (
            <div className="air box-hover">
              <AirQuality data={airQuality} />
            </div>
          )}
          {forecast.length > 0 && (
            <div className="box-hover">
              <HourlyForecast forecast={forecast} />
            </div>
          )}
          {forecast.length > 0 && (
            <div className="box-hover">
              <ForecastDaily days={groupForecastByDay(forecast)} />
            </div>
          )}
          {forecast.length > 0 && (
            <div className="chart box-hover">
              <ForecastChart forecast={forecast} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
