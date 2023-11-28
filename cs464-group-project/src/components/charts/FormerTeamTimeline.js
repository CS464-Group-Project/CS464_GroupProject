import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const FormerTeamTimeline = ({ formerTeams, contracts }) => {
  let chartData = [];

  // console.log(formerTeams);
  if (formerTeams.length != [] && contracts.length != []) {
    const formerTeamData = formerTeams.map((formerTeams) => ({
      team: formerTeams.strFormerTeam,
      startYear: formerTeams.strJoined,
      endYear: formerTeams.strDeparted,
    }));

    const contractData = contracts.map((contracts) => ({
      team: contracts.strTeam,
      startYear: contracts.strYearStart,
      endYear: contracts.strYearEnd,
    }));

    chartData = [...formerTeamData, ...contractData];
    // Filter out entries where startYear and endYear are the same
    chartData = chartData.filter((team) => team.startYear !== team.endYear);

    //Filter out incomplete data
    chartData = chartData.filter((team) => team.startYear !== '');
    chartData = chartData.filter((team) => team.endYear !== '');

    //Sort entries from earliest to latest by starting year
    chartData.sort((a, b) => a.startYear - b.startYear);

    const minStartYear = Math.min(...chartData.map((team) => team.startYear));
    const maxEndYear = Math.max(...chartData.map((team) => team.endYear));
    console.log(chartData);
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
        },
      },
    };

    return <div>{<Bar data={datasets} options={chartOptions} />}</div>;
  }
  return <div>Failed to load player contract timeline</div>;
};
