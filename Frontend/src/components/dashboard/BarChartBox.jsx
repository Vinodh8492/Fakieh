import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartBox = ({ theme }) => {
  const currentTheme = theme || {
    gradient: ["#6366f1", "#818cf8", "#c7d2fe"] // Default indigo gradient
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Production (tons)",
        data: [120, 150, 180, 140, 200],
        backgroundColor: currentTheme.gradient,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-indigo-300 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:ring-2 hover:ring-indigo-500">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Production</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartBox;
