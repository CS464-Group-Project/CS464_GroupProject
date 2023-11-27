import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ContractTimeline = ({ contracts }) => {
  let chartData = [];

  if (contracts.length != []) {
    chartData = contracts.contracts.map((contracts) => ({
      team: contracts.strTeam,
      startYear: contracts.strYearStart,
      endYear: contracts.strYearEnd,
    }));

    //Sort entries from earliest to latest by starting year
    chartData.sort((a, b) => a.startYear - b.startYear);

    const minStartYear = Math.min(...chartData.map((team) => team.startYear));
    const maxEndYear = Math.max(...chartData.map((team) => team.endYear));

    let datasets = {
      labels: chartData.map((team) => team.team),
      datasets: [
        {
          label: 'Years Played',
          data: chartData.map((team) => ({
            x: [team.startYear, team.endYear],
            y: team.team,
          })),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    const chartOptions = {
      type: 'bar',
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: {
          min: minStartYear,
          max: maxEndYear,
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Timeline of contract history',
        },
      },
    };

    return <div>{<Bar data={datasets} options={chartOptions} />}</div>;
  }
  return <div>Failed to load player contract timeline</div>;
};
