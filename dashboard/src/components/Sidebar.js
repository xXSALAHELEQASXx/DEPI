import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" style={{
      width: '250px',
      position: 'fixed',
      left: 0,
      top: '60px',
      bottom: 0,
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;