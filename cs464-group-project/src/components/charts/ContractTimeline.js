// contractTimeline.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export const ContractTimeline = ({ contracts }) => {
  let chartData = [];
  if (contracts.length != []) {
    chartData = contracts.contracts.map((contracts) => ({
      team: contracts.strTeam,
      startYear: contracts.strYearStart,
      endYear: contracts.strYearEnd,
    }));

    let datasets = [
      {
        label: chartData.map((team) => team.team),
        datasets: [
          {
            label: 'Years Played',
            data: chartData.map((team) => ({
              x: [team.startYear, team.endYear],
            })),
          },
        ],

        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      },
    ];

    console.log(datasets);

    return <div>{<Bar data={datasets} options={chartOptions} />}</div>;
  }
  return <div>Failed to load player contract timeline</div>;
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
