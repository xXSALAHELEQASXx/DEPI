import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";

// Import Chart.js components
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

// Register Chart.js components
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
  // Data for Pie Chart
  const pieData = {
    labels: ["18-24", "25-34", "35-44", "45+"],
    datasets: [
      {
        label: "Age Groups",
        data: [25, 40, 20, 15],
        backgroundColor: ["#26A69A", "#FF7043", "#9575CD", "rgba(29, 190, 202, 0.5)"], // Mint Green, Coral, Purple
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ["North America", "Europe", "Asia", "Africa"],
    datasets: [
      {
        label: "Users by Region",
        data: [50, 30, 15, 5],
        backgroundColor: ["#26A69A", "#FF7043", "#9575CD", "rgba(18, 105, 40, 0.5)"], // Mint Green, Coral, Purple, Light Sage
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ["Technology", "Sports", "Music", "Travel"],
    datasets: [
      {
        label: "Interests",
        data: [40, 25, 20, 15],
        borderColor: "#9575CD", // Purple
        backgroundColor: "rgba(47, 223, 205, 0.5)", // Mint Green (semi-transparent)
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Audience Page</h1>
      <p>This page contains audience-related charts.</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Audience Demographics (Pie Chart)</h3>
        <Pie data={pieData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Geographic Distribution (Bar Chart)</h3>
        <Bar data={barData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Interests (Line Chart)</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default AudiencePage;
