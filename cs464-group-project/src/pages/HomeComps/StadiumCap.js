import React from 'react';
import { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const backgroundColors = [
  'rgba(75, 192, 192, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(128, 128, 128, 0.8)',
  'rgba(70, 130, 180, 0.8)',
  'rgba(34, 139, 34, 0.8)',
  'rgba(255, 140, 0, 0.8)',
  'rgba(138, 43, 226, 0.8)',
];

const borderColors = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(128, 128, 128, 1)',
  'rgba(70, 130, 180, 1)',
  'rgba(34, 139, 34, 1)',
  'rgba(255, 140, 0, 1)',
  'rgba(138, 43, 226, 1)',
];

function StadiumCap({ prop }) {
  const sortedTeams = prop.sort((a, b) => b.capacity - a.capacity);

  const data = {
    labels: sortedTeams.map((team) => team.name),
    datasets: [
      {
        label: 'Stadium Capicity',
        data: prop.map((team) => team.capacity),
        options: {
          responsive: true,
        },
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Stadium Capacity',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default StadiumCap;
