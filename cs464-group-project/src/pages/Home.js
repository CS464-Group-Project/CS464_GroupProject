import React, { useState, useEffect } from 'react';
import {
  getAllTeamNames,
  getSeasonStats,
  getPLPastMatches,
  getPLLiveScores,
  getPLUpcomingMatches,
} from '../components/Api/ApiRequest';
import '../style/Home/Home.css';
import StadiumCap from './HomeComps/StadiumCap';
import Table from './HomeComps/Table';
import PastMatchTable from './HomeComps/PastMatchTable';
import LiveMatch from './HomeComps/LiveMatch';

export function Home() {
  const [stadiumCapacity, setStadiumCapacity] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [liveTeams, setLiveTeams] = useState([]);

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
          logo: team.strTeamBadge,
        }));
        setRanking(teamRanks);

        const pastMatchesData = await getPLPastMatches(4328);
        const tempPastMatches = pastMatchesData.events.map((match) => {
          const homeTeam = teamRanks.find(
            (team) => team.id === match.idHomeTeam
          );
          const awayTeam = teamRanks.find(
            (team) => team.id === match.idAwayTeam
          );

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

  //getting live matches
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPLLiveScores();
        if (data.events === null) {
          return;
        }
        console.log(data);
        const plData = data.events.filter((match) => match.idLeague === '4328');
        console.log(data);
        const liveMatches = plData.map((match) => ({
          homeId: match.idHomeTeam,
          awayId: match.idAwayTeam,
          homeTeam: match.strHomeTeam,
          awayTeam: match.strAwayTeam,
          homeScore: match.intHomeScore,
          awayScore: match.intAwayScore,
          clock: match.strProgress,
          homeLogo: match.strHomeTeamBadge,
          awayLogo: match.strAwayTeamBadge,
        }));
        setLiveTeams(liveMatches);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  //Stadium capacity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPLUpcomingMatches();
        console.log(data);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='home-container'>
        <div className='home-charts'>
          <Table ranking={ranking} />
          <div className='gamematches-container'>
            <div className='live-game'>
              {liveTeams.length > 0 ? (
                //if there is live game
                <>
                  <h2>Live Matches</h2>
                  {liveTeams.map((liveMatch) => (
                    <LiveMatch key={liveMatch.homeId} match={liveMatch} />
                  ))}
                </>
              ) : (
                <div className='no-live'>
                  <p>No Live Games Currently</p>
                  <img
                    src='https://media.istockphoto.com/id/609834212/vector/error-404-page.jpg?s=170667a&w=0&k=20&c=WyWApHYs9ku80AUYwDApZ2jADK6S_pG9Gu_K3M_Y4lo='
                    alt='404 Not Found'
                  />
                  <p>Come Back in the Weekends!</p>
                </div>
              )}
            </div>
            {/* looping over name value pairs in an object: https://javascript.info/keys-values-entries  */}
            <div className='match-list-container'>
              <h2>Past Matches</h2>
              <div className='all-past-matches'>
                {Object.entries(pastMatches).map(([date, matches]) => (
                  <PastMatchTable key={date} date={date} matches={matches} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='chart-content'>
          <StadiumCap prop={stadiumCapacity} />
        </div>
      </div>
    </>
  );
}
