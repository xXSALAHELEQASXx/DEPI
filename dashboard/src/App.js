import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';

const App = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main style={{ marginLeft: '250px', padding: '20px' }}>
                <h2>Welcome to the Dashboard</h2>
            </main>
        </div>
    );
};

export default App;
