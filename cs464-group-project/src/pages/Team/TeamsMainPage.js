import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeamsByLeagueName } from '../../components/Api/ApiRequest';
import '../../style/Team.css';

export function Team() {
  const navigate = useNavigate();
  const [displayTeams, setDisplayTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Just using one league for now, can be changed later to search for more leagues
        const leagueName = 'English Premier League';
        const getLeagueInfo = await getTeamsByLeagueName(leagueName);
        setDisplayTeams(getLeagueInfo.teams);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);

  const handleTeamClick = (team) => {
    navigate(`/individualteam`, { state: { team } });
  };

  return (
    <div className='background'>
      <h1>
        <img
          className='league-logo'
          src='/Images/premierleague_logo.png'
          alt='Premier League Logo'
        />
        Welcome to the Premier League
      </h1>
      <div className='flex container overflow-hidden text-center'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-1 gx-1'>
          {displayTeams.map((team) => (
            <div
              key={team.idTeam}
              className='card col p-2'
              onClick={() => handleTeamClick(team)}
            >
              <img
                className='mx-auto image-fluid'
                src={team.strTeamLogo}
                alt={`${team.strTeam} Logo`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div>
                <p className='team-name' key={team.idTeam}>
                  {team.strTeam}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
