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

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <>
      {playerData ? (
        <div>
          <header className='container'>
            <div className='row'>
              {/* Image on the left */}
              <div className='col-md-4'>
                <img
                  src={playerData.strRender}
                  alt={`{playerData.strPlayer} render`}
                  className='img-fluid'
                />
              </div>

              {/* Text in the middle (slightly elevated) */}
              <div className='col-md-4 d-flex align-items-center'>
                <h1 className='mt-3'>{playerData.strPlayer}</h1>
              </div>

              {/* Text on the bottom right */}
              <div className='col-md-4 d-flex justify-content-end align-items-end'>
                {playerData.strNumber && (
                  <h1 className='mb-0'>#{playerData.strNumber}</h1>
                )}
              </div>
            </div>
          </header>

          <div className='container-md mt-4'>
            <div className='row'>
              {/* Right side with player details */}
              <div className='col-md-6'>
                <div className='d-flex align-items-center'>
                  {playerData.strNumber && (
                    <h2>
                      #{playerData.strNumber} {playerData.strPlayer}
                    </h2>
                  )}
                  {!playerData.strNumber && <h2>{playerData.strPlayer}</h2>}
                </div>

                {/* Other player details */}
                <div className='row'>
                  <div className='col-6'>
                    <p>Team: </p>
                    <p>Position: </p>
                    <p>Date of Birth: </p>
                    <p>Nationality:</p>

                    <p>Height: </p>
                  </div>
                  <div className='col-6' style={{ textAlign: 'right' }}>
                    <p>{playerData.strTeam}</p>
                    <p>{playerData.strPosition}</p>
                    <p>{formatDate(playerData.dateBorn)}</p>
                    <p>{playerData.strNationality}</p>
                    <p>{playerData.strHeight}</p>
                  </div>
                </div>

                <div className='col d-flex mt-3 justify-content-evenly'>
                  {/* Team logo as clickable img next to player's name */}
                  {teamData && (
                    <img
                      src={teamData.strTeamBadge}
                      alt={`${teamData.strTeam} Logo`}
                      className='img-fluid team-logo'
                      style={{
                        height: '4em',
                        marginLeft: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={handleTeamClick}
                      title={`Click to visit the ${teamData.strTeam} page`}
                    />
                  )}

                  {playerData.strTwitter && (
                    <a
                      href={`https://${playerData.strTwitter}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        style={{ fontSize: '4em' }}
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
                        style={{ fontSize: '4em' }}
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
                        style={{ fontSize: '4em' }}
                      />
                    </a>
                  )}
                </div>
              </div>
              {/* Left side with player image */}
              <div className='col-md-6'>
                <img
                  src={playerData.strThumb}
                  alt={`${playerData.strPlayer}`}
                  className='img-fluid'
                />
                {/*Social media links if they exist*/}
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
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
