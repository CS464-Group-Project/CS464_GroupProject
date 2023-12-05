import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTeamNames } from '../../Api/ApiRequest';
import '../../style/Team.css';

export function Team() {
  const navigate = useNavigate();
  const [displayTeams, setDisplayTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getLeagueInfo = await getAllTeamNames();
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
      <h1 className='mt-4'>Premier League Teams</h1>
      <div className='flex container overflow-hidden text-center mt-5'>
        <div className='row row-cols-3 row-cols-md-3 row-cols-lg-4 g-1 gx-1'>
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
                <h2 className='team-name' key={team.idTeam}>
                  {team.strTeam}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
