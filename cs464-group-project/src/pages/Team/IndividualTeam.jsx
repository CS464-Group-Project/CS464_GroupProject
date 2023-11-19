import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../style/Team.css';
import { TeamStats } from '../../components/team/TeamStats';
import { TeamsSchedule } from '../../components/team/TeamsSchedule';
import { TeamPlayers } from '../../components/team/TeamPlayers';

export function IndividualTeam() {
  const location = useLocation();
  const [team, setTeam] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { team } = location.state;
        setTeam(team);
      } catch (err) {
        console.error('Error getting player information', err);
      }
    };
    fetchData();
  }, [location.state]);

  return (
    <>
      <h1>Welcome to {team.strAlternate} Page</h1>
      <div className=' flex container-md'>
        <div className='row'>
          <div className='col-sm-4'>
            <img
              className='team-logo image-fluid'
              src={team.strTeamBadge}
              alt={`${team.strTeam} badge logo`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <div className='col'>
            <h2>{team.strTeam}</h2>
            <p>Country: {team.strCountry}</p>
            <p>Formed Year: {team.intFormedYear}</p>
            <p>Stadium: {team.strStadiumLocation}</p>
            <p>Stadium Capacity: {team.intStadiumCapacity}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='chart'>
              <TeamStats teamID={team.idTeam} />
            </div>
            <div className='team-schedule'>
              <TeamsSchedule teamID={team.idTeam} />
            </div>
          </div>
          <div className='col'>
            <div className='team-players'>
              <TeamPlayers teamName={team.strTeam} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
