import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChartBox = ({ theme }) => {
  const currentTheme = theme || {
    primary: "#6366f1" 
  };

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Output (tons)",
        data: [100, 140, 120, 160],
        fill: false,
        borderColor: currentTheme.primary,
        tension: 0.4,
        pointBackgroundColor: currentTheme.primary,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f3f4f6" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-emerald-300 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:ring-2 hover:ring-blue-400">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Output Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartBox;
