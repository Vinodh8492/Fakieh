// src/pages/Weighbridge.jsx
import React from 'react';
import { useState } from 'react';

const Weighbridge = () => {
  const [transactions, setTransactions] = useState([]);
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    if (!weight) return;

    const newEntry = {
      time: new Date().toLocaleTimeString(),
      truckId: `TRK-${Math.floor(Math.random() * 9000) + 1000}`,
      material: 'Corn',
      weight,
    };

    setTransactions([newEntry, ...transactions]);

    setStatus(weight > 25000 ? 'overload' : 'valid');
    setWeight('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Weighbridge Operations</h2>

      {/* Live Weight Display */}
      <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-2">Current Weight</h4>
        <input
          type="number"
          placeholder="e.g., 24500"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="text-4xl text-center border-b-2 border-gray-400 w-64 mb-4 focus:outline-none"
        />
        {status && (
          <div
            className={`text-lg font-semibold ${
              status === 'valid' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status === 'valid' ? '🟢 Valid Weight' : '🔴 Overload Warning'}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Print Ticket
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Sync to ERP
        </button>
      </div>

      {/* Transaction Log Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Truck ID</th>
              <th className="px-4 py-2">Material</th>
              <th className="px-4 py-2">Weight</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No transactions recorded.
                </td>
              </tr>
            ) : (
              transactions.map((entry, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{entry.time}</td>
                  <td className="px-4 py-2">{entry.truckId}</td>
                  <td className="px-4 py-2">{entry.material}</td>
                  <td className="px-4 py-2">{entry.weight} kg</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weighbridge;
