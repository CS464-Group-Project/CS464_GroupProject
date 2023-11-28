import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlayerDetails,
  getTeamByName,
} from '../../components/Api/ApiRequest';
import '../../style/Player.css';

import { PlayerFormerTeams } from '../../components/player/PlayerFormerTeams';
import { PlayerHonours } from '../../components/player/PlayerHonours';
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlayerFormerBadges } from '../../components/player/PlayerFormerBadges';

export function IndividualPlayer() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call to get player information by id
        const response = await getPlayerDetails(id);
        setPlayerData(response.players[0]);
        console.log(response);
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
    <div className='container-md mt-4'>
      {playerData ? (
        <div className='row'>
          {/* Left side with player image */}
          <div className='col-md-6'>
            <img
              src={playerData.strThumb}
              alt={`${playerData.strPlayer}`}
              className='img-fluid'
            />
            {/*Social media links if they exist*/}
            <div className='col d-flex mt-3 justify-content-evenly'>
              {playerData.strTwitter && (
                <a
                  href={`https://${playerData.strTwitter}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ fontSize: '2em' }}
                  />
                </a>
              )}
              {playerData.strInstagram && (
                <a
                  href={`https://${playerData.strInstagram}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ fontSize: '2em' }}
                  />
                </a>
              )}
              {playerData.Youtube && (
                <a
                  href={`https://${playerData.strYoutube}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ fontSize: '2em' }}
                  />
                </a>
              )}
            </div>
          </div>

          {/* Right side with player details */}
          <div className='col-md-6'>
            <div className='d-flex align-items-center'>
              <h2>
                #{playerData.strNumber} {playerData.strPlayer}
              </h2>

              {/* Team logo as clickable img next to player's name */}
              {teamData && (
                <img
                  src={teamData.strTeamBadge}
                  alt={`${teamData.strTeam} Logo`}
                  className='img-fluid team-logo'
                  style={{
                    height: '2.5em',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={handleTeamClick}
                  title={`Click to visit the ${teamData.strTeam} page`}
                />
              )}
            </div>

            {/* Other player details */}
            <div className='row'>
              <div className='col-6'>
                <p>Nationality:</p>
                <p>Team: </p>
                <p>Date of Birth: </p>
                <p>Position: </p>
                <p>Height: </p>
              </div>
              <div className='col-6' style={{ textAlign: 'right' }}>
                <p>{playerData.strNationality}</p>
                <p>{playerData.strTeam}</p>
                <p>{playerData.dateBorn}</p>
                <p>{playerData.strPosition}</p>
                <p>{playerData.strHeight}</p>
              </div>
            </div>
          </div>

          {/*Contract Timeline Chart component */}
          <div className='col-md-12'>
            <PlayerFormerTeams id={id} />
          </div>
          <div className='col-md-6'>{<PlayerHonours id={id} />}</div>
          <div className='col-md-6'>
            <PlayerFormerBadges id={id} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
