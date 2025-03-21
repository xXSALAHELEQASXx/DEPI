import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const AudiencePage = () => {
  const pieData = {
    labels: ["18-24", "25-34", "35-44", "45+"],
    datasets: [
      {
        label: "Age Groups",
        data: [25, 40, 20, 15],
        backgroundColor: ["#26A69A", "#FF7043", "#9575CD", "rgba(29, 190, 202, 0.5)"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: "top", labels: { font: { size: 14 } } },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#ddd",
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  const barData = {
    labels: ["North America", "Europe", "Asia", "Africa"],
    datasets: [
      {
        label: "Users by Region",
        data: [50, 30, 15, 5],
        backgroundColor: ["#26A69A", "#FF7043", "#9575CD", "rgba(18, 105, 40, 0.5)"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: "#666" } },
      y: { ticks: { color: "#666" } },
    },
    plugins: { legend: { display: false } },
  };

  const lineData = {
    labels: ["Technology", "Sports", "Music", "Travel"],
    datasets: [
      {
        label: "Interests",
        data: [40, 25, 20, 15],
        borderColor: "#9575CD",
        backgroundColor: "rgba(47, 223, 205, 0.5)",
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0.4 } },
    plugins: { legend: { display: true, position: "top" } },
  };

  return (
    <Container>
      <h1>Audience Page</h1>
      <p>This page contains audience-related charts.</p>

      <ChartWrapper>
        <h3>Audience Demographics (Pie Chart)</h3>
        <Pie data={pieData} options={pieOptions} />
      </ChartWrapper>

      <ChartWrapper>
        <h3>Geographic Distribution (Bar Chart)</h3>
        <Bar data={barData} options={barOptions} />
      </ChartWrapper>

      <ChartWrapper>
        <h3>Interests (Line Chart)</h3>
        <Line data={lineData} options={lineOptions} />
      </ChartWrapper>
    </Container>
  );
};

export default AudiencePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    height: 250px;
  }
`;
