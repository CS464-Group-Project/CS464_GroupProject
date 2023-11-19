import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLookUpTable } from '../Api/ApiRequest';
import { GoalsChart } from '../charts/GoalsChart';

export function TeamStats({ teamID }) {
  const location = useLocation();
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { team } = location.state;
        const season = '2023-2024';
        const getLeagueRankings = await getLookUpTable(team.idLeague, season);
        setLeagueInfo(getLeagueRankings);
        setLoading(false);
      } catch (err) {
        console.error('Error getting League information', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [location.state]);

  // console.log('League Details: ', leagueInfo);

  if (loading) {
    return <p>Loading...</p>;
  }

  const teamInfo =
    leagueInfo && leagueInfo.table
      ? leagueInfo.table.find((info) => info.idTeam === teamID)
      : null;

  return (
    <>
      <h2 className='text-dark'>Current League Standings</h2>
      {teamInfo ? (
        <div className='ranking'>
          <p>Ranked: {teamInfo.intRank}</p>
          <p>
            Record: {teamInfo.intWin}-{teamInfo.intDraw}-{teamInfo.intLoss}
          </p>
        </div>
      ) : (
        <p>Team information not found or not available</p>
      )}
      <div className='goals-chart w-50'>
        <GoalsChart
          goals={{
            for: teamInfo.intGoalsFor,
            against: teamInfo.intGoalsAgainst,
          }}
        />
      </div>
    </>
  );
}
