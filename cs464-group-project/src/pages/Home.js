import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { getAllTeamNames, getSeasonStats } from '../components/Api/ApiRequest';
import '../style/Home.css';

const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

export function Home() {
  const [stadiumCapacity, setStadiumCapacity] = useState([]);
  const [ranking, setRanking] = useState([]);

  //Stadium capacity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTeamNames();
        //get only id, capacity and team name
        const teams = data.teams.map((team) => ({
          id: team.idTeam,
          capacity: team.intStadiumCapacity,
          name: team.strTeam,
        }));
        setStadiumCapacity(teams);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  //Getting team rankings
  //PL league id: 4328
  //Season: 2023-2024
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSeasonStats(4328, '2023-2024');
        console.log(data.table);
        //get only id, capacity and team name
        const teamRanks = data.table.map((team) => ({
          id: team.idTeam,
          name: team.strTeam,
          capacity: team.intStadiumCapacity,
          rank: team.intRank,
          wins: team.intWin,
          loss: team.intLoss,
          points: team.intPoints,
        }));
        setRanking(teamRanks);
      } catch (err) {
        console.error('Error getting League information', err);
      }

      console.log(ranking);
    };
    fetchData();
  }, []);

  const data = {
    labels: stadiumCapacity.map((team) => team.name),
    datasets: [
      {
        label: 'Stadium Capicity',
        data: stadiumCapacity.map((team) => team.capacity),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  function getTeamClass(index) {
    if (index < 4) {
      return 'champions-league';
    }
    if (index < 6) {
      return 'europa-league';
    }
    if (index == 7) {
      return 'europa-qualification';
    }
    if (index > 16) {
      return 'relegation';
    }
  }

  return (
    <div className='home-charts'>
      <Bar data={data} />
      <div className='team-ranking'>
        <h2>Team Rankings</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Wins</th>
              <th>Loss</th>
              <th>
                <div className='pts-header'>
                  Points
                  <span className='info-container'>
                    <sup className='info-icon'>i</sup>
                    <span className='tooltip'>3 pts for wins, 1 for draws</span>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((team, index) => (
              //assign different class name for top 4 teams, 5th team, bottom 3
              <tr key={team.id} className={getTeamClass(index)}>
                <td>{team.rank}</td>
                <td>{team.name}</td>
                <td>{team.wins}</td>
                <td>{team.loss}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
