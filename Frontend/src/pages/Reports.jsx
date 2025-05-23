// src/pages/Reports.jsx
import React from 'react';
import { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('Daily Production');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [material, setMaterial] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Reporting</h2>

      {/* Report Type Selector */}
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-2 font-medium text-gray-600">Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        >
          <option>Daily Production</option>
          <option>Maintenance Logs</option>
          <option>Order History</option>
        </select>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Material Type</label>
          <input
            type="text"
            placeholder="e.g. Corn, Soy"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Report Preview Pane */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-3">Preview: {reportType}</h4>
        <div className="h-56 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          [Chart/Table Preview Placeholder]
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Export PDF
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Export Excel
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Sync to SAP
        </button>
      </div>
    </div>
  );
};

export default Reports;
