import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatisticsPage from './pages/StatisticsPage';
import MainPage from './pages/MainPage';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;