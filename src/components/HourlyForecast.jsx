import React from "react";

const HourlyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  // Limit to next 24 hours (8 time slots, each 3 hours apart)
  const upcoming = forecast.slice(0, 8);

  return (
    <div className="hourly-forecast">
      <h3>Next 24 Hours</h3>
      <div className="hourly-cards">
        {upcoming.map((item, idx) => {
          const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          return (
            <div className="hour-card" key={idx}>
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
