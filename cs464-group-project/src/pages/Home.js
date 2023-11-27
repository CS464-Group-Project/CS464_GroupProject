import React, { useState, useEffect } from 'react';
import {
  getAllTeamNames,
  getSeasonStats,
  getPLPastMatches,
  getPLLiveScores,
  getHistoryLeagues,
} from '../components/Api/ApiRequest';
import '../style/Home/Home.css';
import StadiumCap from './HomeComps/StadiumCap';
import Table from './HomeComps/Table';
import PastMatchTable from './HomeComps/PastMatchTable';
import { getTeamLogos, allTeamLogos } from '../components/Api/ApiRequest';

export function Home() {
  const [stadiumCapacity, setStadiumCapacity] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [teamLogos, setTeamLogos] = useState([]);

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
        console.log(data);
        //get only id, capacity and team name
        const teamRanks = data.table.map((team) => ({
          id: team.idTeam,
          name: team.strTeam,
          capacity: team.intStadiumCapacity,
          rank: team.intRank,
          wins: team.intWin,
          loss: team.intLoss,
          points: team.intPoints,
          logo: team.strTeamBadge,
        }));
        setRanking(teamRanks);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPLLiveScores();

        console.log(data);
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
        const tempPastMatches = data.events.map((match) => {
          //find logos from ranking array instead of doing another api call
          const homeTeam = ranking.find((team) => team.id === match.idHomeTeam);
          const awayTeam = ranking.find((team) => team.id === match.idAwayTeam);

          return {
            id: match.idEvent,
            homeId: match.idHomeTeam,
            awayId: match.idAwayTeam,
            homeName: match.strHomeTeam,
            awayName: match.strAwayTeam,
            homeScore: match.intHomeScore,
            awayScore: match.intAwayScore,
            eventDate: match.dateEvent,
            homeLogo: homeTeam ? homeTeam.logo : null,
            awayLogo: awayTeam ? awayTeam.logo : null,
          };
        });

        const groupedMatches = tempPastMatches.reduce((acc, match) => {
          const date = match.eventDate;

          //create a property for each date storing in an array of matches
          acc[date] = acc[date] || [];
          acc[date].push(match);
          return acc;
        }, {});
        setPastMatches(groupedMatches);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setTeamLogos(await getTeamLogos());
        console.log(allTeamLogos);
      } catch (error) {
        console.error('Error fetching team logos:', error.message);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className='home-charts'>
        <div className='home-charts-left'>
          <Table ranking={ranking} />
        </div>
        <div className='home-charts-right'>
          <div className='chart-content'>
            <StadiumCap prop={stadiumCapacity} />
          </div>
          {/* looping over name value pairs in an object: https://javascript.info/keys-values-entries  */}
          <div class='match-list-container'>
            {Object.entries(pastMatches).map(([date, matches]) => (
              <PastMatchTable key={date} date={date} matches={matches} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
