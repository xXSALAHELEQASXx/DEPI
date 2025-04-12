// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaChartBar, FaCalendarAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <div
      className="fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-all duration-300 flex justify-center flex-col"
      style={isCollapsed ? { width: '7rem' } : { width: '15%' }}
    >
      {/* Toggle button */}
      <div className="mb-8 flex justify-center cursor-pointer" onClick={toggleSidebar}>
        <FaBars size={32} />
      </div>
      <nav className="flex flex-col gap-16">
        <Link
          to="/"
          className={`flex items-center hover:text-gray-300 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <FaHome size={32} />
          {!isCollapsed && <span className="ml-2 text-lg">Home</span>}
        </Link>
        <Link
          to="/analytics"
          className={`flex items-center hover:text-gray-300 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <FaChartBar size={32} />
          {!isCollapsed && <span className="ml-2 text-lg">Analytics</span>}
        </Link>
        <Link to="/pages/AudiencePage" className={`flex items-center hover:text-gray-300 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <FaChartBar size={32} />
          {!isCollapsed && <span className="ml-2">Audience</span>}
        </Link>
        <Link
          to="/pages/CalendarPage"
          className={`flex items-center hover:text-gray-300 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <FaCalendarAlt size={32} />
          {!isCollapsed && <span className="ml-2 text-lg">Calendar</span>}
        </Link>
        <Link
          to="/settings"
          className={`flex items-center hover:text-gray-300 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <FaCog size={32} />
          {!isCollapsed && <span className="ml-2 text-lg">Settings</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
