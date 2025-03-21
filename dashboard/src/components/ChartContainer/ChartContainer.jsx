import React from "react";
import styles from "./ChartContainer.module.css";

const ChartContainer = ({ title, children }) => {
  return (
    <div className={styles.chartContainer}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default ChartContainer;
