import React, { useEffect, useState } from 'react';

const Alarms = () => {
  const [alarms, setAlarms] = useState([]);
  const [priority, setPriority] = useState('Critical');
  const [filterArea, setFilterArea] = useState('All');

  // Fetch alarms from backend
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/alarms')
      .then((res) => res.json())
      .then((data) => setAlarms(data))
      .catch((err) => console.error('Failed to load alarms:', err));
  }, []);

  const handleAcknowledge = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/alarms/acknowledge/${id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        setAlarms((prev) =>
          prev.map((alarm) =>
            alarm.id === id ? { ...alarm, acknowledged: true } : alarm
          )
        );
      }
    } catch (error) {
      console.error('Acknowledge failed:', error);
    }
  };

  const filteredAlarms = alarms.filter(
    (alarm) =>
      alarm.priority === priority &&
      (filterArea === 'All' || alarm.area === filterArea)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Alarm Management</h2>

      {/* Priority Tabs */}
      <div className="flex gap-4">
        {['Critical', 'Warning', 'Info'].map((p) => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            className={`px-4 py-2 rounded ${
              priority === p
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Area Filter */}
      <div>
        <label className="text-sm font-medium mr-2">Filter by Area:</label>
        <select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option>All</option>
          <option>Intake</option>
          <option>Production</option>
          <option>Outloading</option>
        </select>
      </div>

      {/* Alarm List Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Equipment</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlarms.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No alarms for this view.
                </td>
              </tr>
            ) : (
              filteredAlarms.map((alarm) => (
                <tr key={alarm.id} className="border-t">
                  <td className="px-4 py-2">{alarm.time}</td>
                  <td className="px-4 py-2">{alarm.equipment}</td>
                  <td className="px-4 py-2">{alarm.message}</td>
                  <td className="px-4 py-2">
                    {alarm.acknowledged ? (
                      <span className="text-green-600">🟢 Acknowledged</span>
                    ) : (
                      <span className="text-red-600">🔴 Active</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      disabled={alarm.acknowledged}
                      onClick={() => handleAcknowledge(alarm.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        alarm.acknowledged
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Acknowledge
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alarms;
