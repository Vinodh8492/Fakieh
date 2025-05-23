import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

const AreaChartBox = ({ theme }) => {
 const currentTheme = theme || {
    gradient: ["#6366f1", "#818cf8", "#c7d2fe"] // Default indigo gradient
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: [50, 65, 60, 70, 90, 100, 80],
        fill: true,
        backgroundColor: currentTheme.gradient[1],
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
    <div className="bg-white rounded-xl p-4 border border-blue-300 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:ring-2 hover:ring-blue-400">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Energy Consumption</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChartBox;
