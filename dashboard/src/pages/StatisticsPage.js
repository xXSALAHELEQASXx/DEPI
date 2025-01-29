import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  // Data for Bar Chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [50, 100, 150, 200, 250, 300],
        backgroundColor: "#007bff",
      },
    ],
  };

  // Data for Doughnut Chart
  const doughnutData = {
    labels: ["Posts", "Comments", "Likes", "Shares"],
    datasets: [
      {
        label: "Engagement",
        data: [40, 30, 20, 10],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Page Views",
        data: [500, 700, 800, 1000],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Statistics & Analytics Page</h1>
      <p>Here you can view analytics for posts and their detailed statistics.</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>User Growth Over Time (Bar Chart)</h3>
        <Bar data={barData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Engagement Breakdown (Doughnut Chart)</h3>
        <Doughnut data={doughnutData} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Page Views (Line Chart)</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default StatisticsPage;