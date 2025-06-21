import React from "react";

const ForecastDaily = ({ days }) => {
  if (!Array.isArray(days) || days.length === 0) return null;

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid";
    }
  };

  return (
    <div className="forecast-daily">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {days.map((day, index) => {
          const iconUrl = day.icon
            ? `https://openweathermap.org/img/wn/${day.icon}@2x.png`
            : "/weather_img/default.png";

          return (
            <div className="forecast-card" key={index}>
              <p>{formatDate(day.date)}</p>
              <img src={iconUrl} alt={day.desc || "weather"} />
              <p>
                {isFinite(day.max) ? Math.round(day.max) : "--"}° /{" "}
                {isFinite(day.min) ? Math.round(day.min) : "--"}°C
              </p>
              <small>{day.desc || "N/A"}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDaily;
