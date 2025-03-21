import React from "react";
import StatBox from "@/components/StatBox/StatBox";
import ChartContainer from "@/components/ChartContainer/ChartContainer";
import { Button } from "@/components/Button/Button";
import chartData from "@/data/chartData";
import styled from "styled-components";

const MainPage = () => {
  return (
    <DashboardContainer>
      <StatsContainer>
        <StatBox title="Likes" value="12,450" color="#FF7043" />
        <StatBox title="Posts" value="580" color="#26A69A" />
        <StatBox title="Followers" value="34,200" color="#9575CD" />
      </StatsContainer>

      <ChartsContainer>
        <ChartContainer title="Followers by Region" data={chartData} />
        <ChartContainer title="Monthly Growth" data={chartData} />
      </ChartsContainer>

      <ActionsContainer>
        <Button variant="outline">Export Data</Button>
        <Button variant="primary">Refresh</Button>
      </ActionsContainer>
    </DashboardContainer>
  );
};

export default MainPage;

const DashboardContainer = styled.div`
  background: #F7F5F2;
  min-height: 100vh;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
