import React from 'react';
// src/routes.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Material from './pages/Material';
import Production from './pages/Production';
import Maintenance from './pages/Maintenance';
import Orders from './pages/Orders';
import RFID from './pages/RFID';
import Weighbridge from './pages/Weighbridge';
import Alarms from './pages/Alarms';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/material" element={<Material />} />
      <Route path="/production" element={<Production />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/rfid" element={<RFID />} />
      <Route path="/weighbridge" element={<Weighbridge />} />
      <Route path="/alarms" element={<Alarms />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default RoutesComponent;
