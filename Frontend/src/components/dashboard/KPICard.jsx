import React from "react";

const KPICard = ({ title, value, icon, theme }) => {
  const fallbackColor = "#6366f1"; // Default gray if theme not provided
  const cardColor = theme?.primary || fallbackColor;

  return (
    <div
      className="flex items-center justify-between rounded-xl p-4 border shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:ring-2"
      style={{
        background: cardColor,
        borderColor: cardColor,
        boxShadow: `0 0 15px ${cardColor}`,
      }}
    >
      <div>
        <h3 className="text-sm font-semibold uppercase opacity-80 text-white">{title}</h3>
        <p className="text-2xl font-bold mt-1 text-white">{value}</p>
      </div>
      <div className="text-4xl text-white opacity-80">
        {icon}
      </div>
    </div>
  );
};

export default KPICard;
