import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Premier League Color Palette
const backgroundColor = [
  'rgba(4,245,255)',
  'rgba(233,0,82)',
  'rgba(255,255,255)',
  'rgba(0,255,133)',
  'rgba(56,0,60)',
];

const borderColor = ['rgba(56,0,60)'];

export function GoalsChart({ goals }) {
  const data = {
    labels: ['Goals Scored', 'Goals Scored Against'],
    datasets: [
      {
        label: 'Goals',
        data: [goals.for, goals.against],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        boderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
