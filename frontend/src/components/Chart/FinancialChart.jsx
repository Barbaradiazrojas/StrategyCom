import React from 'react';
import { Line } from 'react-chartjs-2';

const FinancialChart = ({ data, title }) => {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default FinancialChart;