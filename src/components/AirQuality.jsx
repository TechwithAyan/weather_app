import React from "react";

const getAQIDescription = (aqi) => {
  switch (aqi) {
    case 1: return { label: "Good", color: "green" };
    case 2: return { label: "Fair", color: "limegreen" };
    case 3: return { label: "Moderate", color: "orange" };
    case 4: return { label: "Poor", color: "orangered" };
    case 5: return { label: "Very Poor", color: "red" };
    default: return { label: "Unknown", color: "gray" };
  }
};

const AirQuality = ({ data }) => {
  if (!data) return null;

  const aqi = data.list[0].main.aqi;
  const { label, color } = getAQIDescription(aqi);

  return (
    <div className="air">
      <h3 style={{ fontSize: "24px", marginBottom: "10px", fontWeight: "600" }}>
        Air Quality Index
      </h3>
      <p style={{ color, fontSize: "22px", fontWeight: "bold" }}>
        {label} (AQI: {aqi})
      </p>
    </div>
  );
};

export default AirQuality;

