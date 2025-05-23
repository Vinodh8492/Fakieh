// src/pages/Admin.jsx
import React from 'react';
import { useState } from 'react';

const Admin = () => {
  const [users] = useState([
    { name: 'John Doe', role: 'Operator', access: 'Limited' },
    { name: 'Jane Smith', role: 'Admin', access: 'Full' },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">System Administration</h2>

      {/* User Management */}
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold mb-3">User Management</h4>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Access Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold mb-3">Integration Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ERP/SAP Username"
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="ERP/SAP Password"
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Alert Email 1"
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Alert Email 2"
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save Settings
        </button>
      </div>

      {/* System Diagnostics */}
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold mb-3">System Diagnostics</h4>
        <ul className="space-y-2 text-sm">
          <li>PLC Connection: <span className="text-green-600 font-semibold">Connected ✅</span></li>
          <li>SCADA Link: <span className="text-green-600 font-semibold">Connected ✅</span></li>
          <li>ERP Sync: <span className="text-green-600 font-semibold">Operational ✅</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
