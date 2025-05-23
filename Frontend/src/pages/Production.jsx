import React, { useState, useEffect } from 'react';

const Production = () => {
  const [materials, setMaterials] = useState([]);
  const [batchTable, setBatchTable] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [todayOutput, setTodayOutput] = useState(0);

  useEffect(() => {
    // Fetch materials
    fetch('http://127.0.0.1:5000/api/production/materials')
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error('Error fetching materials:', err));

    // Fetch batches
    fetch('http://127.0.0.1:5000/api/production/batches')
      .then((res) => res.json())
      .then((data) => setBatchTable(data))
      .catch((err) => console.error('Error fetching batches:', err));

    // Fetch alarms
    fetch('http://127.0.0.1:5000/api/production/alarms')
      .then((res) => res.json())
      .then((data) => setAlarms(data))
      .catch((err) => console.error('Error fetching alarms:', err));

    // Fetch today's output
    fetch('http://127.0.0.1:5000/api/production/output')
      .then((res) => res.json())
      .then((data) => setTodayOutput(data.output_in_tons))
      .catch((err) => console.error('Error fetching output:', err));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Production Dashboard</h2>

      {/* Live Stats */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Today’s Output</h3>
        <p className="text-3xl font-bold text-green-600">{todayOutput.toLocaleString()} tons</p>
      </div>

      {/* Material Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((mat, idx) => (
          <div key={idx} className="bg-white rounded shadow p-4">
            <h4 className="font-semibold text-gray-700">{mat.name}</h4>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-2">
              <div
                className={`h-4 rounded-full ${
                  mat.level > 60 ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${mat.level}%` }}
              />
            </div>
            <span className="text-sm">{mat.status}</span>
          </div>
        ))}
      </div>

      {/* Batch Recipe Table */}
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <h4 className="font-semibold mb-3">Batch Recipes</h4>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Recipe ID</th>
              <th className="px-4 py-2">Ingredients</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {batchTable.map((batch, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{batch.id}</td>
                <td className="px-4 py-2">{batch.ingredients}</td>
                <td className="px-4 py-2">{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alarm Feed */}
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold mb-3">Alarm Feed</h4>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {alarms.map((alarm, i) => (
            <li key={i} className="text-sm border-b pb-2">
              <span className="font-semibold">{alarm.time}</span>: {alarm.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">
            Export PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export Excel
          </button>
        </div>
        <div className="bg-gray-200 text-sm px-3 py-2 rounded">
          ERP Sync Status: <span className="text-green-700 font-semibold">Synced ✅</span>
        </div>
      </div>
    </div>
  );
};

export default Production;
