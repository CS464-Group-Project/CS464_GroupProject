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

  //Add former team data to chartData
  if (formerTeams.length != null && contracts.length != null) {
    const formerTeamData = formerTeams.map((formerTeams) => ({
      team: formerTeams.strFormerTeam,
      startYear: formerTeams.strJoined,
      endYear: formerTeams.strDeparted,
    }));

    //Add contracted team data to chartData
    const contractData = contracts.map((contracts) => ({
      team: contracts.strTeam,
      startYear: contracts.strYearStart,
      endYear: contracts.strYearEnd,
    }));

    //concatenate former team data with contract data
    chartData = [...formerTeamData, ...contractData];

    // Filter out entries where startYear and endYear are the same
    chartData = chartData.filter((team) => team.startYear !== team.endYear);

    //Filter out incomplete data
    chartData = chartData.filter((team) => team.startYear !== '');
    chartData = chartData.filter((team) => team.endYear !== '');

    //Sort entries from earliest to latest by starting year
    chartData.sort((a, b) => a.startYear - b.startYear);

    // Combine entries with the same team name and consecutive start/end years
    chartData = chartData.reduce((result, current) => {
      const last = result[result.length - 1];
      if (
        last &&
        last.team === current.team &&
        last.endYear === current.startYear
      ) {
        last.endYear = current.endYear;
      } else {
        result.push(current);
      }
      return result;
    }, []);

    // Combine entries with the same team name and consecutive start/end years
    const uniqueEntries = {};
    chartData = chartData.filter((current) => {
      const key = `${current.team}_${current.startYear}_${current.endYear}`;
      if (!uniqueEntries[key]) {
        uniqueEntries[key] = true;
        return true;
      }
      return false;
    });

    //Determine start and end of chart
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
          borderSkipped: false,
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
          display: false,
        },
      },
    };

    return (
      <div>
        {' '}
        <h3>Former Teams Timeline</h3>
        {<Bar data={datasets} options={chartOptions} />}
      </div>
    );
  }
  return <div>Failed to load player contract timeline</div>;
};
