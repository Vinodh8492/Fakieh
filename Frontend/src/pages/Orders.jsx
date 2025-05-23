// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const Orders = () => {
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('New Order');
  const [formData, setFormData] = useState({
    supplier: '',
    material_type: '',
    customer: '',
    order_id: '',
    truck_license_plate: ''
  });

  const fetchMaterials = async () => {
    const res = await axios.get('http://127.0.0.1:5000/api/materials');
    setMaterials(res.data);
  };

  useEffect(()=>{
    fetchMaterials()
  },[])

  console.log(materials)

  const tabs = ['New Order', 'In Progress', 'Completed'];

  const orderStatusSteps = [
    { label: 'Intake', color: 'green' },
    { label: 'Weighing', color: 'yellow' },
    { label: 'Loading', color: 'red' },
    { label: 'Complete', color: 'green' },
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.supplier ||
      !formData.material_type ||
      !formData.customer ||
      !formData.order_id ||
      !formData.truck_license_plate
    ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      alert('Order created successfully!');
      setFormData({
        supplier: '',
        material_type: '',
        customer: '',
        order_id: '',
        truck_license_plate: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Order Management</h2>

      {/* Tabs */}
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded shadow-sm ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* New Order Form */}
      {activeTab === 'New Order' && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 shadow rounded"
        >
          <select
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Supplier</option>
            <option>Supplier A</option>
          </select>

          <select
            name="material_type"
            value={formData.material_type}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Material Type</option>
            {[
              ...new Set(materials.map((material) => material.type))
            ].map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>


          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Customer</option>
            <option>Customer X</option>
          </select>

          <input
            type="text"
            name="order_id"
            value={formData.order_id}
            onChange={handleChange}
            placeholder="Order ID"
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            name="truck_license_plate"
            value={formData.truck_license_plate}
            onChange={handleChange}
            placeholder="Truck License Plate"
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Scan & Bind RFID Tag
          </button>
        </form>
      )}

      {/* Order Status Panel */}
      <div className="bg-white p-6 shadow rounded">
        <h4 className="text-lg font-semibold mb-4">Order Status</h4>
        <div className="flex items-center justify-between space-x-4">
          {orderStatusSteps.map((step, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center ${
                  step.color === 'green'
                    ? 'bg-green-500'
                    : step.color === 'yellow'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                } text-white`}
              >
                ●
              </div>
              <div className="text-sm">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weighbridge Data */}
      <div className="bg-white p-6 shadow rounded">
        <h4 className="font-semibold mb-2">Weighbridge Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Gross Weight"
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Tare Weight"
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Net Weight"
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
