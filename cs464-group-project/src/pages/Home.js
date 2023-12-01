import React, { useState, useEffect } from 'react';
import {
  getAllTeamNames,
  getSeasonStats,
  getPLPastMatches,
  getPLLiveScores,
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
        const plData = data.events.filter((match) => match.idLeague === '4328');
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

  return (
    <>
      <h1>
        <img
          className='league-logo'
          src='/Images/premierleague_logo.png'
          alt='Premier League Logo'
        />
        Welcome to the Premier League
      </h1>
      <div className='flex container-fluid mt-4 home-container'>
        <div className='row' id='main-row'>
          <div
            className='col col-sm-12 col-lg-6 col-xl-6 col-xxl-4'
            id='left-col'
          >
            <Table ranking={ranking} />
          </div>
          <div className='col'>
            <div className='row'>
              <div className='col-12'>
                <h2>Live Events</h2>
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
                      <h2>No Live Games Currently</h2>
                      <p>Come Back on the Weekends!</p>
                    </div>
                  )}
                </div>
              </div>
              <div className='col'>
                <h2>Past Matches</h2>
                <div className='all-past-matches'>
                  {Object.entries(pastMatches).map(([date, matches]) => (
                    <PastMatchTable key={date} date={date} matches={matches} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 chart-content'>
            Stadium Capacity
            <StadiumCap prop={stadiumCapacity} />
          </div>
        </div>
      </div>
    </>
  );
}
