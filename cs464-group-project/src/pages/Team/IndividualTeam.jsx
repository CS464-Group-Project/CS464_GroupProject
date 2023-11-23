import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../style/Team.css';
import { TeamStats } from '../../components/team/TeamStats';
import { TeamsSchedule } from '../../components/team/TeamsSchedule';
import { TeamPlayers } from '../../components/team/TeamPlayers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

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

  // Create an array to store all of the fan arts, then randomly display one each time page loads
  const fanArtImages = [
    team.strTeamFanart1,
    team.strTeamFanart2,
    team.strTeamFanart3,
    team.strTeamFanart4,
  ];

  const index = Math.floor(Math.random() * fanArtImages.length);
  const randdomFanArt = fanArtImages[index];

  return (
    <>
      <h1 className='mt-4'>Welcome to {team.strAlternate} Page</h1>
      <div className=' flex container-md mt-4'>
        <div className='row'>
          <div className='col-6-6 col-sm-6 col-md-4' id='team-logo'>
            <div className='row'>
              <div className='col-12'>
                <a
                  className='team-homepage'
                  href={`https://${team.strWebsite}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className='image-fluid'
                    src={team.strTeamBadge}
                    alt={`${team.strTeam} badge logo`}
                  />
                </a>
              </div>
              <div className='col d-flex justify-content-evenly social-media-icons'>
                <a
                  href={`https://${team.strTwitter}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href={`https://${team.strFacebook}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href={`https://${team.strYoutube}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>
          <div className='col' id='team-info'>
            <img
              className='image-fluid'
              src={team.strStadiumThumb}
              alt={`${team.strTeam} stadium`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p>Country: {team.strCountry}</p>
            <p>Formed Year: {team.intFormedYear}</p>
            <p>Stadium: {team.strStadiumLocation}</p>
            <p>Stadium Capacity: {team.intStadiumCapacity}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-6-6 col-sm-6-6 col-lg-6'>
            <div className='chart mt-4 '>
              <TeamStats teamID={team.idTeam} />
            </div>
            <div className='team-schedule mt-4 p-4'>
              <TeamsSchedule teamID={team.idTeam} />
            </div>
          </div>
          <div className='col'>
            <div className='row'></div>
            <div className='col team-players mt-4 p-4'>
              <TeamPlayers teamName={team.strTeam} />
            </div>
            <div className='col fan-art'>
              <h3>Fan Art</h3>
              <img
                className='image-fluid'
                src={randdomFanArt}
                alt={`${team.strTeam} - Fan Arts`}
                style={{ maxWidth: '100%', maxHeight: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
