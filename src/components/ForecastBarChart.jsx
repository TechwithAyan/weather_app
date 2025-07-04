import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ForecastBarChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const filtered = forecast.filter((_, index) => index % 8 === 0);

  const data = {
    labels: filtered.map((f) => f.dt_txt.split(" ")[0]),
    datasets: [
      {
        label: "🌡️ Temp (°C)",
        data: filtered.map((f) => f.main.temp),
        backgroundColor: [
          "#74ebd5", "#ACB6E5", "#89f7fe", "#66a6ff",
          "#70e1f5", "#ffd3a5", "#fbc2eb"
        ],
        borderColor: "#1f1c2c",
        borderWidth: 2,
        borderRadius: 12,
        barThickness: 40,
        hoverBackgroundColor: "#ff9a9e",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#111",
          font: {
            size: 14,
            weight: "bold",
            family: "Poppins",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f1c2c",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#222",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: {
          color: "#222",
          font: {
            size: 13,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "linear-gradient(to bottom right, #e0c3fc, #8ec5fc)",
        padding: "30px",
        borderRadius: "24px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        border: "2px solid #111",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#111",
          fontSize: "26px",
          marginBottom: "20px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        5-Day Forecast
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ForecastBarChart;
