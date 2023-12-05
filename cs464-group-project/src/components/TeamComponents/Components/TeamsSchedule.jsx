import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUpcomingSchedule } from '../../../Api/ApiRequest';
import { UpcomingSchedule } from '../Charts/CurrentTeamSchedule';
import '../../../style/Team.css';

export function TeamsSchedule({ teamID }) {
  const location = useLocation();
  const [teamSchedule, setTeamSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { team } = location.state;
        const data = await getUpcomingSchedule(team.idTeam);
        setTeamSchedule(data);
        setLoading(false);
      } catch (err) {
        console.error('Error getting team schedule', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [location.state]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // console.log('Team Schedule: ', teamSchedule);
  // console.log('team01: ', teamID);

  return (
    <>
      <h2>Upcoming Schedule</h2>
      <div>
        <UpcomingSchedule team={{ teamSchedule }} teamID={teamID} />
      </div>
    </>
  );
}

export default TeamsSchedule;
