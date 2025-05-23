import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartBox = ({ theme }) => {
  const currentTheme = theme || {
    gradient: ["#6366f1", "#818cf8", "#c7d2fe"] // Default indigo gradient
  };

  const data = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Share",
        data: [45, 25, 30],
        backgroundColor: currentTheme.gradient,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-blue-300 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(96,165,250,0.4)] hover:ring-2 hover:ring-blue-400">
      <h3 className="text-md font-semibold mb-2 text-gray-700">Product Distribution</h3>
      <div className="h-64 relative">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChartBox;
