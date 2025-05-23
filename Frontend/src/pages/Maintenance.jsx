import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Maintenance = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [cycleCounters, setCycleCounters] = useState([]);
  const [log, setLog] = useState({
    technicianId: '',
    actionTaken: '',
    partsReplaced: ''
  });

  useEffect(() => {
    // Fetch equipment list
    axios.get('http://127.0.0.1:5000/api/equipment')
      .then(res => setEquipmentList(res.data))
      .catch(err => console.error('Error fetching equipment:', err));

    // Fetch cycle counters
    axios.get('http://127.0.0.1:5000/api/cycle_counters')
      .then(res => setCycleCounters(res.data))
      .catch(err => console.error('Error fetching counters:', err));
  }, []);

  const handleLogChange = (e) => {
    const { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  const submitLog = () => {
    // Add client-side validation
    if (!log.technicianId || !log.actionTaken) {
      alert('Technician ID and Action Taken are required.');
      return;
    }

    axios.post('http://127.0.0.1:5000/api/logbook', log)
      .then(() => {
        alert('Log saved successfully');
        setLog({ technicianId: '', actionTaken: '', partsReplaced: '' });
      })
      .catch(err => {
        console.error('Error saving log:', err);
        alert('Failed to save log');
      });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Maintenance Management</h2>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <select className="border border-gray-300 rounded px-3 py-2">
          <option>Filter by Area</option>
          <option>Intake</option>
          <option>Production</option>
        </select>
        <select className="border border-gray-300 rounded px-3 py-2">
          <option>Device Type</option>
          <option>Motor</option>
          <option>Valve</option>
        </select>
        <input type="date" className="border border-gray-300 rounded px-3 py-2" />
        <input type="date" className="border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentList.map((eq, i) => (
          <div key={i} className="bg-white p-4 shadow rounded">
            <h4 className="text-lg font-semibold">{eq.name}</h4>
            <p className="text-sm mt-1">Run Hours: <strong>{eq.run_hours}</strong></p>
            <p className="text-sm mt-1">{eq.status}</p>
          </div>
        ))}
      </div>

      {/* Cycle Counters */}
      <div className="bg-white p-4 shadow rounded">
        <h4 className="font-semibold mb-2">Cycle Counters</h4>
        <ul className="space-y-1">
          {cycleCounters.map((counter, i) => (
            <li key={i} className="text-sm">
              {counter.device}: <strong>{counter.cycles}</strong> cycles
            </li>
          ))}
        </ul>
      </div>

      {/* Alarm History Graph Placeholder */}
      <div className="bg-white p-6 shadow rounded">
        <h4 className="font-semibold mb-2">Alarm History Graph</h4>
        <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          [Graph Placeholder]
        </div>
      </div>

      {/* Logbook + Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Digital Logbook */}
        <div className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-2">Digital Logbook</h4>
          <input
            type="text"
            name="technicianId"
            value={log.technicianId}
            onChange={handleLogChange}
            placeholder="Technician ID"
            className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
          />
          <input
            type="text"
            name="actionTaken"
            value={log.actionTaken}
            onChange={handleLogChange}
            placeholder="Action Taken"
            className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
          />
          <input
            type="text"
            name="partsReplaced"
            value={log.partsReplaced}
            onChange={handleLogChange}
            placeholder="Parts Replaced"
            className="w-full border border-gray-300 px-3 py-2 mb-2 rounded"
          />
          <button
            onClick={submitLog}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
          >
            Save Log
          </button>
        </div>

        {/* Preventive Maintenance Calendar Placeholder */}
        <div className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-2">Preventive Maintenance Calendar</h4>
          <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
            [Calendar Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
