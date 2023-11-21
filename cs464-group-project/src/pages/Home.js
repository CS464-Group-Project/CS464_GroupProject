import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {
  getAllTeamNames,
  getSeasonStats,
  getPLPastMatches,
} from '../components/Api/ApiRequest';
import '../style/Home.css';
import StadiumCap from './HomeComps/StadiumCap';
import Table from './HomeComps/Table';

export function Home() {
  const [stadiumCapacity, setStadiumCapacity] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);

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
    };
    fetchData();
  }, []);

  //Past 15 match
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPLPastMatches(4328);
        console.log(data);
        const tempPastMatches = data.events.map((match) => ({
          id: match.idEvent,
          homeId: match.idHomeTeam,
          awayId: match.idAwayTeam,
          homeName: match.strHomeTeam,
          awayName: match.strAwayTeam,
          homeScore: match.intHomeScore,
          awayScore: match.intAwayScore,
          eventDate: match.dateEvent,
        }));
        setPastMatches(tempPastMatches);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  console.log(pastMatches);
  return (
    <>
      <div className='home-charts'>
        <StadiumCap prop={stadiumCapacity} />
        <Table ranking={ranking} />
      </div>
    </>
  );
}
