import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AudiencePage from "./pages/AudiencePage";
import StatisticsPage from "./pages/StatisticsPage";
import ChatbotPage from "./pages/ChatbotPage";
import CalendarPage from "./pages/CalendarPage";
import MainPage from "./pages/MainPage";

import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter> 
      <div className="App">
        <Header />
        <Sidebar />
        <main style={{ marginLeft: "250px", padding: "20px" }}>
          <h2>Welcome to the Dashboard</h2>
          <Routes>
            <Route path="/AudiencePage" element={<AudiencePage />} /> 
            <Route path="/StatisticsPage" element={<StatisticsPage />} />
            <Route path="/chatbotpage" element={<ChatbotPage />} />
            <Route path="/CalendarPage" element={<CalendarPage/>} />
            <Route path="/MainPage" element={<MainPage/>} />
        
        
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
