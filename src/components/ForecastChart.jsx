// src/components/ForecastChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ForecastChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  // Filter every 8 steps (~1 per day)
  const filtered = forecast.filter((_, index) => index % 8 === 0);

  const data = {
    labels: filtered.map((f) => f.dt_txt.split(" ")[0]),
    datasets: [
      {
        label: "Temp (°C)",
        data: filtered.map((f) => f.main.temp),
        borderColor: "#000",            // Black line
        backgroundColor: "#fff",        // White point dots
        pointBackgroundColor: "#fff",   // White center
        pointBorderColor: "#000",       // Black border
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",   // White legend text
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // X axis ticks
          font: { size: 13, weight: "bold" },
        },
        grid: {
          color: "rgba(183, 88, 231, 0.1)", // Subtle grid
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Y axis ticks
          font: { size: 13, weight: "bold" },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e1e2f",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default ForecastChart;
