import React from "react";
import styled from "styled-components";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { FaHome, FaChartBar, FaCalendarAlt, FaMagic } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);

const barChartData = {
  labels: ["USA", "UK", "Germany", "France", "India"],
  datasets: [
    {
      label: "Followers by Region",
      data: [500, 400, 350, 300, 450],
      backgroundColor: "#6A1B9A",
      borderRadius: 5,
    },
  ],
};

const lineChartData = {
  labels: Array.from({ length: 30 }, (_, i) => i + 1),
  datasets: [
    {
      label: "Data No 1",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20),
      borderColor: "#9575CD",
      fill: false,
    },
    {
      label: "Data No 2",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10),
      borderColor: "#FF7043",
      fill: false,
    },
  ],
};

const doughnutChartData = {
  labels: ["Engagement", "Reach"],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ["#FF7043", "#6A1B9A"],
    },
  ],
};

const MainPage = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <UserProfile>
          <img src="https://via.placeholder.com/40" alt="user" />
          <p>user name</p>
        </UserProfile>
        <NavIcons>
          <FaHome />
          <FaChartBar />
          <FaCalendarAlt />
          <FaMagic />
        </NavIcons>
        <ThemeToggle>
          <FiSun />
          <FiMoon />
        </ThemeToggle>
      </Sidebar>

      <MainContent>
        <StatsContainer>
          <StatBox color="#E1BEE7" textColor="#6A1B9A">
            <h3>Likes</h3>
            <p>12,450</p>
          </StatBox>
          <StatBox color="#E1BEE7" textColor="#6A1B9A">
            <h3>Posts</h3>
            <p>580</p>
          </StatBox>
          <StatBox color="#E1BEE7" textColor="#6A1B9A">
            <h3>Followers</h3>
            <p>34,200</p>
          </StatBox>
        </StatsContainer>

        <ChartsContainer>
          <ChartBox>
            <h2>FLOW CHART</h2>
            <Line data={lineChartData} />
          </ChartBox>
          <ChartBox>
            <Doughnut data={doughnutChartData} />
          </ChartBox>
          <ChartBox>
            <h2>View Monthly</h2>
            <Bar data={barChartData} />
          </ChartBox>
        </ChartsContainer>
      </MainContent>

      <FloatingButton>
        <MdAdd />
      </FloatingButton>
    </DashboardContainer>
  );
};

export default MainPage;

const DashboardContainer = styled.div`
  display: flex;
  background: #F7F5F2;
  min-height: 100vh;
  color: #4A148C;
`;

const Sidebar = styled.div`
  width: 80px;
  background: #4A148C;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const UserProfile = styled.div`
  text-align: center;
  img {
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;

const NavIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 24px;
  margin-top: 40px;
`;

const ThemeToggle = styled.div`
  margin-top: auto;
  font-size: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const StatBox = styled.div`
  background: ${(props) => props.color};
  color: ${(props) => props.textColor};
  padding: 20px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  font-weight: bold;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const ChartBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #FF7043;
  color: white;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
