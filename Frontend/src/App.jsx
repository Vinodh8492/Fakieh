import React from 'react';
// src/App.jsx
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import RoutesComponent from './routes';

const App = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <TopBar />
        <main className="p-6">
          <RoutesComponent />
        </main>
      </div>
    </div>
  );
};

export default App;

