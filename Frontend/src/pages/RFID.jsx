// src/pages/RFID.jsx
import React, { useState, useEffect } from 'react';

const RFID = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [formData, setFormData] = useState({
    truckId: '',
    material: '',
    rfid: '',
  });
  const [log, setLog] = useState([]);
  const [rfidExists, setRfidExists] = useState(false);
  const [isScanPopupOpen, setIsScanPopupOpen] = useState(false);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);


  useEffect(() => {
    fetchLog();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'rfid') {
      checkRFIDExists(value);
    }
  };

  const generateRFID = () => {
    const newRFID = 'RFID-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData((prev) => ({
      ...prev,
      rfid: newRFID,
    }));
    checkRFIDExists(newRFID);
  };

  const checkRFIDExists = async (rfid) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/rfid/check/${rfid}`);
      const result = await response.json();
      setRfidExists(result.exists);
    } catch (err) {
      console.error('RFID check failed:', err);
    }
  };

  const fetchLog = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/rfid/log');
      if (response.ok) {
        const data = await response.json();
        setLog(
          data.map(
            (entry) =>
              `Tag #${entry.rfid}: Bound to ${entry.truckId}, ${entry.material} at ${entry.timestamp}`
          )
        );
      }
    } catch (error) {
      console.error('Error fetching log:', error);
    }
  };

  const handleBind = async () => {
    if (formData.truckId && formData.material && formData.rfid && !rfidExists) {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/rfid/bind', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          alert('Tag bound successfully!');
          fetchLog();
          setIsValidated(true);
          setFormData({ truckId: '', material: '', rfid: '' });
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to bind RFID tag');
        }
      } catch (error) {
        console.error('Binding error:', error);
        alert('Failed to bind RFID tag. Please try again.');
      }
    } else {
      alert('Invalid data or RFID already exists.');
    }
  };

  const getRFIDTagFromLogEntry = (entry) => {
    // Example: "Tag #RFID1234: Bound to Truck1, MaterialX at 2023-05-23 14:00"
    const match = entry.match(/^Tag #([^:]+):/);
    return match ? match[1] : '';
  };
  const rfidTags = log.map(getRFIDTagFromLogEntry).filter(tag => tag);
  

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">RFID Management</h2>

      {/* Scanner Status */}
      <div className="bg-white p-4 rounded shadow">
        <h4 className="text-lg font-semibold">RFID Scanner Status</h4>
        <p className="text-green-600 font-medium mt-1">🟢 Ready to Scan</p>
        <button
    onClick={() => setIsScanPopupOpen(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Scan
  </button>
      </div>

      {/* Tag Binding Form */}
      <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="truckId"
          value={formData.truckId}
          onChange={handleChange}
          placeholder="Truck ID"
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <input
          type="text"
          name="material"
          value={formData.material}
          onChange={handleChange}
          placeholder="Material Type"
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <div className="flex gap-2 col-span-full md:col-span-1">
          <input
            type="text"
            name="rfid"
            value={formData.rfid}
            onChange={handleChange}
            placeholder="RFID Tag #"
            className="border border-gray-300 px-3 py-2 rounded flex-1"
          />
          <button
            onClick={generateRFID}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            🎲 Auto
          </button>
        </div>

        {rfidExists && (
          <p className="text-red-500 text-sm col-span-full">
            ⚠️ This RFID is already bound to another truck/material.
          </p>
        )}

        <div className="col-span-full text-right">
          <button
            onClick={handleBind}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Bind Tag
          </button>
        </div>
      </div>

      {/* Validation Log */}
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Validation Log</h4>
        <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
          {log.length === 0 ? (
            <li className="text-gray-400 italic">No tags validated yet.</li>
          ) : (
            log.map((entry, i) => <li key={i}>✅ {entry}</li>)
          )}
        </ul>
      </div>

      {/* Conveyor Controls */}
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Conveyor Controls</h4>
        <div className="flex gap-4">
          <button
            disabled={!isValidated}
            className={`px-4 py-2 rounded ${
              isValidated
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start
          </button>
          <button
            disabled={!isValidated}
            className={`px-4 py-2 rounded ${
              isValidated
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Stop
          </button>
        </div>
      </div>

      {isScanPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[60vh] overflow-auto shadow">

            <h3 className="text-xl font-bold mb-4">Scan RFID Tags</h3>

            {rfidTags.length === 0 ? (
              <p className="text-gray-500 italic">No scanned tags to show.</p>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-2xl font-mono p-4 border rounded w-full text-center">
                  {rfidTags[currentTagIndex]}
                </p>

                <div className="flex gap-4">
                  <button
                    disabled={currentTagIndex === 0}
                    onClick={() => setCurrentTagIndex(currentTagIndex - 1)}
                    className={`px-4 py-2 rounded ${currentTagIndex === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    Previous
                  </button>
                  <button
                    disabled={currentTagIndex === rfidTags.length - 1}
                    onClick={() => setCurrentTagIndex(currentTagIndex + 1)}
                    className={`px-4 py-2 rounded ${currentTagIndex === rfidTags.length - 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            <div className="text-right mt-6">
              <button
                onClick={() => {
                  setIsScanPopupOpen(false);
                  setCurrentTagIndex(0);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default RFID;
