import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartBox = ({ theme }) => {
const currentTheme = theme || {
    gradient: ["#6366f1", "#818cf8", "#c7d2fe"] // Default indigo gradient
  };

  const data = {
    labels: ["Corn", "Soy", "Wheat"],
    datasets: [
      {
        data: [300, 250, 150],
        backgroundColor: currentTheme.gradient,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 200).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("Materials: 3", width / 2, height / 2);
      ctx.save();
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-blue-300 shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(96,165,250,0.4)] hover:ring-2 hover:ring-blue-400">
      <h3 className="text-md font-semibold mb-2 text-gray-700">Material Usage</h3>
      <div className="h-64 relative">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
};

export default DoughnutChartBox;
