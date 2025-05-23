// import React, { useState } from "react";
// import themes from "../themes";

// const ThemeSelector = ({ selectedTheme, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const currentTheme = themes[selectedTheme] || Object.values(themes)[0];

//   const handleSelect = (key) => {
//     onChange(key);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative w-56 text-sm">
//       <label className="block text-gray-700 font-medium mb-1">Theme Color</label>
//       <button
//         className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center space-x-2">
//           <span
//             className="w-3 h-3 rounded-full"
//             style={{ backgroundColor: currentTheme.primary }}
//           ></span>
//           <span>{currentTheme.name}</span>
//         </div>
//       </button>

//       {isOpen && (
//         <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//           {Object.entries(themes).map(([key, value]) => (
//             <li
//               key={key}
//               onClick={() => handleSelect(key)}
//               className={`cursor-pointer flex items-center px-3 py-2 hover:bg-gray-100 ${
//                 selectedTheme === key ? "font-semibold bg-gray-100" : ""
//               }`}
//             >
//               <span
//                 className="inline-block w-3 h-3 rounded-full mr-2"
//                 style={{ backgroundColor: value.primary }}
//               ></span>
//               {value.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ThemeSelector;







import React, { useState } from "react";
import themes from "../themes";

const ThemeSelector = ({ selectedTheme, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = themes[selectedTheme] || Object.values(themes)[0];

  const handleSelect = (key) => {
    onChange(key);
    setIsOpen(false);
  };

  return (
    <div className="relative w-50 text-sm">
      <label className="block text-blue-600 text-xs font-semibold mb-1 px-1">Card Background</label>
      <button
        className="w-full bg-white border border-blue-500 rounded-xl py-2 pl-3 pr-10 text-left shadow-sm cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <span
            className="w-4 h-4 rounded-full shadow-sm border border-white"
            style={{ backgroundColor: currentTheme.primary }}
          ></span>
          <span className="font-medium text-gray-800">{currentTheme.name}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-auto animate-fade-in">
          {Object.entries(themes).map(([key, value]) => (
            <li
              key={key}
              onClick={() => handleSelect(key)}
              className={`cursor-pointer flex items-center px-4 py-2 hover:bg-blue-50 transition-colors ${
                selectedTheme === key ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              <span
                className="inline-block w-3.5 h-3.5 rounded-full mr-3 border border-gray-300"
                style={{ backgroundColor: value.primary }}
              ></span>
              {value.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;