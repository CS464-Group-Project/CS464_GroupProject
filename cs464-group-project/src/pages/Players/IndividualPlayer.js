import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlayerDetails,
  getTeamByName,
} from '../../components/Api/ApiRequest';

export function IndividualPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlayerDetails(id);
        setPlayerData(response.players[0]);

        // Make API call to get team information by name
        const teamName = response.players[0].strTeam;
        const teamResponse = await getTeamByName(teamName);
        setTeamData(teamResponse.teams[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleTeamClick = () => {
    navigate(`/individualteam`, { state: { team: teamData } });
  };

  return (
    <div className='container-mt4'>
      {playerData ? (
        <div className='row'>
          {/* Left side with player image */}
          <div className='col-md-6'>
            <img
              src={playerData.strThumb}
              alt={`${playerData.strPlayer}`}
              className='img-fluid'
            />
          </div>

          {/* Right side with player details */}
          <div className='col-md-6'>
            <div className='d-flex align-items-center'>
              <h2>{playerData.strPlayer}</h2>

              {/* Team logo as clickable img next to player's name */}
              {teamData && (
                <img
                  src={teamData.strTeamBadge}
                  alt={`${teamData.strTeam} Logo`}
                  className='img-fluid'
                  style={{ height: '2.5em', marginLeft: '10px' }}
                  onClick={handleTeamClick}
                />
              )}
            </div>

            {/* Other player details */}
            <p>Team: {playerData.strTeam}</p>
            <p>Country: {playerData.strNationality}</p>
            <p>Position: {playerData.strPosition}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
