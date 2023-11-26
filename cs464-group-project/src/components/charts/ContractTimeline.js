// contractTimeline.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export const ContractTimeline = ({ contracts }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (contracts && contracts.lenth > 0) {
      const getChartData = () => {
        const newChartData = {
          labels: contracts.map((contract) => contract.strTeam),
          datasets: contracts.map((contract, index) => ({
            label: contract.strTeam,
            data: [
              { x: contract.strYearStart, y: index },
              {
                x: contract.strYearEnd,
                y: index,
              },
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          })),
        };
        setChartData(newChartData);
        console.log(newChartData);
      };
      console.log(contracts);
      getChartData();
    }
  }, [contracts]);

  return (
    <div>
      <h1>test</h1>
      {chartData && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

const chartOptions = {
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      beginAtZero: true,
    },
    y: {
      type: 'category',
      position: 'left',
    },
  },
};
