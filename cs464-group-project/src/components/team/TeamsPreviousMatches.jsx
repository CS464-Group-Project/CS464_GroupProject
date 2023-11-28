import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPreviousTeamMatches } from '../Api/ApiRequest';
import { PreviousMatches } from '../charts/PreviousSchedule';
import '../../style/Team.css';

export function TeamsPreviousMatches({ teamID }) {
  const location = useLocation();
  const [prevMatches, setPrevMatches] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { team } = location.state;
        const data = await getPreviousTeamMatches(team.idTeam);
        setPrevMatches(data);
        setLoading(false);
      } catch (err) {
        console.error('Error getting teams previous matches');
        setLoading(false);
      }
    };
    fetchData();
  }, [location.state]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Previous Matches</h2>
      <div>
        <PreviousMatches team={{ prevMatches }} teamID={teamID} />
      </div>
    </>
  );
}
