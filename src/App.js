// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Porfolio from './pages/Porfolio';
import Chart from './pages/chart';
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <button onClick={toggleSidebar} className="text-3xl m-2 cursor-pointer">&#9776;</button>
          <div className='px-16'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Porfolio />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
