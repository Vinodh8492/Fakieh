// import React, { useState, useEffect } from "react";
// import themes from "../themes";
// import ThemeSelector from "../components/ThemeSelector";
// import KPICard from "../components/dashboard/KPICard";
// import PieChartBox from "../components/dashboard/PieChartBox";
// import BarChartBox from "../components/dashboard/BarChartBox";
// import DoughnutChartBox from "../components/dashboard/DoughnutChartBox";
// import LineChartBox from "../components/dashboard/LineChartBox";
// import AreaChartBox from "../components/dashboard/AreaChartBox";
// import axios from 'axios';

// import {
//   MdAssignment,
//   MdCategory,
//   MdPrecisionManufacturing,
//   MdOutlineShowChart,
//   MdAccessTime,
//   MdLocalShipping 
// } from "react-icons/md";

// const Dashboard = () => {
//   const [materialCount, setMaterialCount] = useState(0);
//   const [orderCount, setOrderCount] = useState(0);
//   const [selectedTheme, setSelectedTheme] = useState("blue");
//   const theme = themes[selectedTheme];
//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/materials');
//         setMaterialCount(res.data.length);
//       } catch (error) {
//         console.error("Error fetching materials count:", error);
//         // Optionally set an error state or keep count at 0
//       }
//     };

//     fetchMaterials();

//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/orders');
//         setOrderCount(res.data.length);
//       } catch (error) {
//         console.error("Error fetching orders count:", error);
//         // Optionally set an error state or keep count at 0
//       }
//     };

//     fetchOrders();

//   }, []); // Empty dependency array means this effect runs once on mount

//   return (
//     <div className="space-y-6">
//         {/* Header and Theme Selector */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-700">Dashboard Overview</h2>
//         <ThemeSelector selectedTheme={selectedTheme} onChange={setSelectedTheme} />
//       </div>

//       {/* KPI Cards */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//   <KPICard title="Total Orders" value={orderCount} icon={<MdAssignment />} bgColor="#3b82f6" />
//   <KPICard title="Materials" value={materialCount} icon={<MdCategory />} bgColor="#3b82f6" />
//   <KPICard title="Units Produced" value="15,600" icon={<MdPrecisionManufacturing />} bgColor="#3b82f6" />
//   <KPICard title="Efficiency" value="92%" icon={<MdOutlineShowChart />} bgColor="#3b82f6" />
//   <KPICard title="Last Batch" value="10:42 AM" icon={<MdAccessTime />} bgColor="#3b82f6" />
//   <KPICard title="Active Trucks" value="8" icon={<MdLocalShipping />} bgColor="#3b82f6" />
// </div>


//     {/* Charts Grid */}
// <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//   <PieChartBox />
//   <BarChartBox />
//   <DoughnutChartBox />
//   <LineChartBox />
//   <AreaChartBox />
//   <BarChartBox />
// </div>

//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import themes from "../themes";
import ThemeSelector from "../components/ThemeSelector";
import KPICard from "../components/dashboard/KPICard";
import PieChartBox from "../components/dashboard/PieChartBox";
import BarChartBox from "../components/dashboard/BarChartBox";
import DoughnutChartBox from "../components/dashboard/DoughnutChartBox";
import LineChartBox from "../components/dashboard/LineChartBox";
import AreaChartBox from "../components/dashboard/AreaChartBox";
import axios from 'axios';

import {
  MdAssignment,
  MdCategory,
  MdPrecisionManufacturing,
  MdOutlineShowChart,
  MdAccessTime,
  MdLocalShipping 
} from "react-icons/md";

const Dashboard = () => {
  const [materialCount, setMaterialCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("indigo"); // default theme
  const theme = themes[selectedTheme];

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/materials');
        setMaterialCount(res.data.length);
      } catch (error) {
        console.error("Error fetching materials count:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/orders');
        setOrderCount(res.data.length);
      } catch (error) {
        console.error("Error fetching orders count:", error);
      }
    };

    fetchMaterials();
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header and Theme Selector */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Dashboard Overview</h2>
        <ThemeSelector selectedTheme={selectedTheme} onChange={setSelectedTheme} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Orders" value={orderCount} icon={<MdAssignment />} theme={theme} />
        <KPICard title="Materials" value={materialCount} icon={<MdCategory />} theme={theme} />
        <KPICard title="Units Produced" value="15,600" icon={<MdPrecisionManufacturing />} theme={theme} />
        <KPICard title="Efficiency" value="92%" icon={<MdOutlineShowChart />} theme={theme} />
        <KPICard title="Last Batch" value="10:42 AM" icon={<MdAccessTime />} theme={theme} />
        <KPICard title="Active Trucks" value="8" icon={<MdLocalShipping />} theme={theme} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PieChartBox theme={theme} />
        <BarChartBox theme={theme} />
        <DoughnutChartBox theme={theme} />
        <LineChartBox theme={theme} />
        <AreaChartBox theme={theme} />
        <BarChartBox theme={theme} />
      </div>
    </div>
  );
};

export default Dashboard;
