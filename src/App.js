import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastBarChart from "./components/ForecastBarChart";
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
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const apiKey = "4eb241b7af83393993d52117f98abaad";

  useEffect(() => {
    document.body.setAttribute("data-theme", darkTheme ? "dark" : "light");
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

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
      if (weatherData.cod !== 200) {
        setWeather(null);
        setForecast([]);
        setAirQuality(null);
        return;
      }
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData?.list || []);

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
      setWeather(null);
      setForecast([]);
      setAirQuality(null);
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
      setForecast(forecastData?.list || []);

      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const airData = await airRes.json();
      setAirQuality(airData);
    } catch (err) {
      console.error("Error fetching weather by location:", err);
      setWeather(null);
      setForecast([]);
      setAirQuality(null);
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
          <button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {darkTheme ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <div className="container">
        <div className="left-section">
          {weather && (
            <div className="weather box-hover glass">
              <WeatherCard weather={weather} />
            </div>
          )}
          <div className="map-container box-hover glass">
            <MapComponent location={weather?.coord} />
          </div>
        </div>

        <div className="right-section">
          {airQuality && (
            <div className="air box-hover glass">
              <AirQuality data={airQuality} />
            </div>
          )}
          {Array.isArray(forecast) && forecast.length > 0 && (
            <div className="box-hover glass">
              <HourlyForecast forecast={forecast} />
            </div>
          )}
          {Array.isArray(forecast) && forecast.length > 0 && (
            <div className="box-hover glass">
              <ForecastDaily days={groupForecastByDay(forecast)} />
            </div>
          )}
          {Array.isArray(forecast) && forecast.length > 0 && (
            <div className="chart box-hover glass">
              <ForecastBarChart forecast={forecast} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
