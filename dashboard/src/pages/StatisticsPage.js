import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

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

const StatisticsPage = () => {
  // Data for Bar Chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [50, 100, 150, 200, 250, 300],
        backgroundColor: "#9575CD", // Purple
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
        backgroundColor: ["#FF7043", "#26A69A", "#9575CD", "#28A745"], // Coral, Mint Green, Purple, Green
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
        borderColor: "#9575CD", // Purple
        backgroundColor: "rgba(38, 166, 154, 0.5)", // Mint Green (semi-transparent)
        fill: true,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#FBF8F6", padding: "20px" }}>
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
