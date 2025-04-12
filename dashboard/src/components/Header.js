import React from 'react';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-center justify-end p-4 bg-white shadow">
      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none">
          <FaBell size={24} className="text-gray-800" />
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="rounded-full"
          />
          <span className="text-gray-800 font-semibold text-xl">Nav</span>
        </div>
      </div>
    </header>
  );
};

export default Header;