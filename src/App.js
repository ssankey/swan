// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Porfolio from './pages/Porfolio';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col min-h-screen">
          <div className="flex items-center justify-between bg-gray-100 py-2 px-4">
            <button onClick={toggleSidebar} className="text-3xl cursor-pointer">
              &#9776;
            </button>
          </div>
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Porfolio />} />
            </Routes>
          </div>
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;