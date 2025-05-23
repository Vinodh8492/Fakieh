import React from "react";


import { Link, useLocation } from 'react-router-dom';
import {
  MdCategory, MdFactory, MdEngineering, MdOutlineAssignment,
  MdReceiptLong, MdFlashOn, MdReport, MdAdminPanelSettings,MdInsertChart,MdSpaceDashboard
} from 'react-icons/md';
import logo from '../assets/Hercules.png';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { title: 'Dashboard', path: '/', icon: <MdSpaceDashboard /> },

    { title: 'Material', path: '/material', icon: <MdCategory /> },
    { title: 'Production', path: '/production', icon: <MdFactory /> },
    { title: 'Maintenance', path: '/maintenance', icon: <MdEngineering /> },
    { title: 'Orders', path: '/orders', icon: <MdOutlineAssignment /> },
    { title: 'RFID', path: '/rfid', icon: <MdReceiptLong /> },
    { title: 'Weighbridge', path: '/weighbridge', icon: <MdFlashOn /> },
    { title: 'Alarms', path: '/alarms', icon: <MdReport /> },
    { title: 'Reports', path: '/reports', icon: <MdInsertChart /> },
    { title: 'Admin', path: '/admin', icon: <MdAdminPanelSettings /> },
  ];

  const sidebarBg = '#d3d4da';        // light gray
  const activeBg = '#5a5b60';         // dark gray (for active)
  const activeTextColor = '#ffffff'; // white
  const inactiveTextColor = '#000000'; // black

  return (
    <div
      className="w-64 h-screen fixed top-0 left-0 z-10"
      style={{ backgroundColor: sidebarBg }}
    >
    <div className="p-6 border-b border-gray-400 flex items-center justify-center">
  <img
    src={logo}
    alt="Hercules Logo"
    className="h-16 w-auto object-contain"
  />
</div>

      <nav className="mt-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.title}>
                <Link
  to={item.path}
  className={`flex items-center gap-3 px-4 py-3 rounded-md transition font-semibold text-base tracking-wide`}
  style={{
    backgroundColor: isActive ? activeBg : 'transparent',
    color: isActive ? activeTextColor : inactiveTextColor,
    fontSize: '1.1rem', // larger than Tailwind's base
  }}
  onMouseEnter={(e) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = activeBg;
      e.currentTarget.style.color = activeTextColor;
    }
  }}
  onMouseLeave={(e) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = inactiveTextColor;
    }
  }}
>
  <span className="text-xl">{item.icon}</span> {/* Slightly larger icons too */}
  {item.title}
</Link>

              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


