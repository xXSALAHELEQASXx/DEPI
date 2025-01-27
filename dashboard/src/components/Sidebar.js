import React from 'react';

const Sidebar = () => {
    return (
        <nav style={{ width: '250px', backgroundColor: '#333', color: '#fff', height: '100vh', padding: '10px' }}>
            <ul>
                <li>Main</li>
                <li>Audience</li>
                <li>Statistics</li>
                <li>Settings</li>
                <li>Calendar</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
