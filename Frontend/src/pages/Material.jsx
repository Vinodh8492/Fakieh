
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Material = () => {
//   const [materials, setMaterials] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     unit: '',
//     code: '',
//     type: '',
//   });
//   const [editingId, setEditingId] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const fetchMaterials = async () => {
//     const res = await axios.get('http://localhost:5000/materials');
//     setMaterials(res.data);
//   };

//   const handleAdd = async () => {
//     if (formData.name && formData.unit && formData.code && formData.type) {
//       await axios.post('http://localhost:5000/materials', formData);
//       setFormData({ name: '', unit: '', code: '', type: '' });
//       fetchMaterials();
//     }
//   };

//   const handleEdit = (material) => {
//     setEditingId(material.id);
//     setFormData({
//       name: material.name,
//       unit: material.unit,
//       code: material.code,
//       type: material.type
//     });
//   };

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/materials/${editingId}`, formData);
//     setFormData({ name: '', unit: '', code: '', type: '' });
//     setEditingId(null);
//     fetchMaterials();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this material?")) {
//       await axios.delete(`http://localhost:5000/materials/${id}`);
//       fetchMaterials();
//     }
//   };

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-gray-700">Material Management</h2>

//       <div className="bg-white p-4 shadow-md rounded mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Material Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="unit"
//           placeholder="Unit"
//           value={formData.unit}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="code"
//           placeholder="Code"
//           value={formData.code}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Type"
//           value={formData.type}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <div className="col-span-full text-right">
//           {editingId ? (
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Update Material
//             </button>
//           ) : (
//             <button
//               onClick={handleAdd}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//             >
//               Add Material
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="min-w-full text-sm text-left text-gray-600">
//           <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Unit</th>
//               <th className="px-4 py-2">Code</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {materials.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400">No materials added yet.</td>
//               </tr>
//             ) : (
//               materials.map((mat) => (
//                 <tr key={mat.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{mat.name}</td>
//                   <td className="px-4 py-2">{mat.unit}</td>
//                   <td className="px-4 py-2">{mat.code}</td>
//                   <td className="px-4 py-2">{mat.type}</td>
//                   <td className="px-4 py-2 text-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(mat)}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(mat.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Material;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Material = () => {
//   const [materials, setMaterials] = useState([]);
//   const [formData, setFormData] = useState({ name: '', unit: '', code: '', type: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [viewingMaterial, setViewingMaterial] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const fetchMaterials = async () => {
//     const res = await axios.get('http://localhost:5000/materials');
//     setMaterials(res.data);
//   };

//   const handleAdd = async () => {
//     if (formData.name && formData.unit && formData.code && formData.type) {
//       await axios.post('http://localhost:5000/materials', formData);
//       setFormData({ name: '', unit: '', code: '', type: '' });
//       fetchMaterials();
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   const handleEdit = (material) => {
//     setEditingId(material.id);
//     setFormData({ name: material.name, unit: material.unit, code: material.code, type: material.type });
//   };

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/materials/${editingId}`, formData);
//     setFormData({ name: '', unit: '', code: '', type: '' });
//     setEditingId(null);
//     fetchMaterials();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/materials/${id}`);
//     setShowDeletePopup(null);
//     fetchMaterials();
//   };

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   return (
//     <div className="relative">
//       <h2 className="text-2xl font-bold mb-4 text-gray-700">Material Management</h2>

//       {/* Inline input fields for adding material */}
//       <div className="bg-white p-4 shadow-md rounded mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Material Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="unit"
//           placeholder="Unit"
//           value={formData.unit}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="code"
//           placeholder="Code"
//           value={formData.code}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Type"
//           value={formData.type}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <div className="col-span-full text-right">
//           <button onClick={handleAdd} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//             Add Material
//           </button>
//         </div>
//       </div>

//       {(editingId !== null || viewingMaterial) && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow-md w-96 relative">
//             <button onClick={() => { setEditingId(null); setViewingMaterial(null); }}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
//             <h3 className="text-lg font-semibold mb-4">{viewingMaterial ? 'View Material' : 'Edit Material'}</h3>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Material Name" />
//             <input type="text" name="unit" value={formData.unit} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Unit" />
//             <input type="text" name="code" value={formData.code} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Code" />
//             <input type="text" name="type" value={formData.type} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Type" />
//             {!viewingMaterial && (
//               <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
//             )}
//           </div>
//         </div>
//       )}

//       {showDeletePopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow-md w-96 text-center">
//             <p className="mb-4">Are you sure you want to delete this material?</p>
//             <button onClick={() => handleDelete(showDeletePopup)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setShowDeletePopup(null)} className="ml-4 px-4 py-2 border rounded">Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="min-w-full text-sm text-left text-gray-600">
//           <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Unit</th>
//               <th className="px-4 py-2">Code</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {materials.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400">No materials added yet.</td>
//               </tr>
//             ) : (
//               materials.map((mat) => (
//                 <tr key={mat.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{mat.name}</td>
//                   <td className="px-4 py-2">{mat.unit}</td>
//                   <td className="px-4 py-2">{mat.code}</td>
//                   <td className="px-4 py-2">{mat.type}</td>
//                   <td className="px-4 py-2 text-center space-x-2">
//                     <button onClick={() => setViewingMaterial(mat) || setFormData(mat)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">View</button>
//                     <button onClick={() => handleEdit(mat)}
//                       className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Edit</button>
//                     <button onClick={() => setShowDeletePopup(mat.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Material;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Material = () => {
//   const [materials, setMaterials] = useState([]);
//   const [formData, setFormData] = useState({ name: '', unit: '', code: '', type: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [viewingMaterial, setViewingMaterial] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const fetchMaterials = async () => {
//     const res = await axios.get('http://localhost:5000/materials');
//     setMaterials(res.data);
//   };

// const handleAdd = async () => {
//   if (formData.name && formData.unit && formData.code && formData.type) {
//     try {
//       const res = await axios.post('http://localhost:5000/materials', formData);
//       console.log('Add response:', res.data);
//       setFormData({ name: '', unit: '', code: '', type: '' });
//       fetchMaterials();
//     } catch (error) {
//       console.error('Add error:', error.response?.data || error.message);
//       alert('Error adding material');
//     }
//   } else {
//     alert('Please fill in all fields.');
//   }
// };


//   const handleEdit = (material) => {
//     setEditingId(material.id);
//     setFormData({ name: material.name, unit: material.unit, code: material.code, type: material.type });
//   };

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/materials/${editingId}`, formData);
//     setFormData({ name: '', unit: '', code: '', type: '' });
//     setEditingId(null);
//     fetchMaterials();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/materials/${id}`);
//     setShowDeletePopup(null);
//     fetchMaterials();
//   };

//   useEffect(() => {
//     fetchMaterials();
//   }, []);

//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-700">Material Management</h2>
//         <button onClick={handleAdd} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//           Add Material
//         </button>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Material Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="unit"
//           placeholder="Unit"
//           value={formData.unit}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="code"
//           placeholder="Code"
//           value={formData.code}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Type"
//           value={formData.type}
//           onChange={handleChange}
//           className="border border-gray-300 px-3 py-2 rounded"
//         />
//       </div>

//       {(editingId !== null || viewingMaterial) && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow-md w-96 relative">
//             <button onClick={() => { setEditingId(null); setViewingMaterial(null); }}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
//             <h3 className="text-lg font-semibold mb-4">{viewingMaterial ? 'View Material' : 'Edit Material'}</h3>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Material Name" />
//             <input type="text" name="unit" value={formData.unit} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Unit" />
//             <input type="text" name="code" value={formData.code} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Code" />
//             <input type="text" name="type" value={formData.type} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Type" />
//             {!viewingMaterial && (
//               <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
//             )}
//           </div>
//         </div>
//       )}

//       {showDeletePopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded shadow-md w-96 text-center">
//             <p className="mb-4">Are you sure you want to delete this material?</p>
//             <button onClick={() => handleDelete(showDeletePopup)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
//             <button onClick={() => setShowDeletePopup(null)} className="ml-4 px-4 py-2 border rounded">Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="min-w-full text-sm text-left text-gray-600">
//           <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Unit</th>
//               <th className="px-4 py-2">Code</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {materials.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400">No materials added yet.</td>
//               </tr>
//             ) : (
//               materials.map((mat) => (
//                 <tr key={mat.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{mat.name}</td>
//                   <td className="px-4 py-2">{mat.unit}</td>
//                   <td className="px-4 py-2">{mat.code}</td>
//                   <td className="px-4 py-2">{mat.type}</td>
//                   <td className="px-4 py-2 text-center space-x-2">
//                     <button onClick={() => setViewingMaterial(mat) || setFormData(mat)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">View</button>
//                     <button onClick={() => handleEdit(mat)}
//                       className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">Edit</button>
//                     <button onClick={() => setShowDeletePopup(mat.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Material;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ name: '', unit: '', code: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  const [viewingMaterial, setViewingMaterial] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchMaterials = async () => {
    const res = await axios.get('http://127.0.0.1:5000/materials');
    setMaterials(res.data);
  };

  const handleAdd = async () => {
    if (formData.name && formData.unit && formData.code && formData.type) {
      try {
        await axios.post('http://127.0.0.1:5000/materials', formData);
        setFormData({ name: '', unit: '', code: '', type: '' });
        fetchMaterials();
      } catch (error) {
        alert('Error adding material');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleEdit = (material) => {
    setEditingId(material.id);
    setFormData({ name: material.name, unit: material.unit, code: material.code, type: material.type });
  };

  const handleUpdate = async () => {
    await axios.put(`http://127.0.0.1:5000/materials/${editingId}`, formData);
    setFormData({ name: '', unit: '', code: '', type: '' });
    setEditingId(null);
    fetchMaterials();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/materials/${id}`);
    setShowDeletePopup(null);
    fetchMaterials();
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Material Management</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          <FiPlus />
          Add Material
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input type="text" name="name" placeholder="Material Name" value={formData.name} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded" />
        <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded" />
        <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded" />
        <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded" />
      </div>

      {(editingId !== null || viewingMaterial) && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <button onClick={() => { setEditingId(null); setViewingMaterial(null); }} className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</button>
            <h3 className="text-lg font-semibold mb-4">{viewingMaterial ? 'View Material' : 'Edit Material'}</h3>
            <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Material Name" />
            <input type="text" name="unit" value={formData.unit} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Unit" />
            <input type="text" name="code" value={formData.code} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Code" />
            <input type="text" name="type" value={formData.type} onChange={handleChange} disabled={!!viewingMaterial} className="w-full mb-2 px-3 py-2 border rounded" placeholder="Type" />
            {!viewingMaterial && (
              <button onClick={handleUpdate} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
            )}
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <p className="mb-4">Are you sure you want to delete this material?</p>
            <button onClick={() => handleDelete(showDeletePopup)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            <button onClick={() => setShowDeletePopup(null)} className="ml-4 px-4 py-2 border rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow border border-gray-500">

        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-300 text-gray-800 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">No materials added yet.</td>
              </tr>
            ) : (
              materials.map((mat) => (
                <tr key={mat.id} className="border-t hover:bg-gray-50 font-bold text-sm">
                  <td className="px-4 py-2">{mat.name}</td>
                  <td className="px-4 py-2">{mat.unit}</td>
                  <td className="px-4 py-2">{mat.code}</td>
                  <td className="px-4 py-2">{mat.type}</td>
                  <td className="px-4 py-2 text-center space-x-3">
                    <button
                      onClick={() => {
                        setViewingMaterial(mat);
                        setFormData({
                          name: mat.name,
                          unit: mat.unit,
                          code: mat.code,
                          type: mat.type
                        });
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEye size={24} />
                    </button>
                    <button onClick={() => handleEdit(mat)} className="text-gray-600 hover:text-gray-800">
                      <FiEdit size={24} />
                    </button>
                    <button onClick={() => setShowDeletePopup(mat.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 size={24} />
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

export default Material;
