
// src/components/TopBar.jsx
import React from "react";
import asmLogo from "../assets/Asm_logo.png"; // Make sure the logo is placed correctly
import logo from "../assets/fakieh-logo.png"; // Make sure the logo is placed correctly

const TopBar = () => {
  return (
    <div
      className="h-26 flex items-center justify-between px-6 border-b border-gray-300 shadow-sm"
      style={{ backgroundColor: "#d3d4da" }} // matching your design
    >
      {/* Left Placeholder (empty for now or date/time) */}
      <div></div>

      {/* Right Section: Admin label, profile icon, logo */}
      <div className="flex items-center gap-4">
        <div className="text-lg font-medium text-gray-800">
          Hello, <span className="font-bold">Admin</span>
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-semibold">
          A
        </div>

        <img
          src={asmLogo}
          alt="ASM Logo"
          className="h-18 w-auto object-contain"
        />
         <img
          src={logo}
          alt="fakieh-Logo"
          className="h-20 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default TopBar;


