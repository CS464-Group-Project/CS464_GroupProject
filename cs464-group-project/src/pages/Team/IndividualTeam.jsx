import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../style/Team.css';
import { TeamStats } from '../../components/team/TeamStats';
import { TeamsSchedule } from '../../components/team/TeamsSchedule';
import { TeamRoster } from '../../components/team/TeamRoster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export function IndividualTeam() {
  const location = useLocation();
  const [team, setTeam] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Cycles and displays each image in the array

  useEffect(() => {
    const updateImageIndex = () => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % fanArtImages.length,
      );
    };
    const intervalId = setInterval(updateImageIndex, 5000);
    return () => clearInterval(intervalId);
  }, [fanArtImages.length]);

  return (
    <>
      <h1 className='mt-4'>Welcome to {team.strAlternate} Page</h1>
      <div className=' flex container-fluid mt-4'>
        <div className='row' id='main-row'>
          <div
            className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2'
            id='links-logo'
          >
            <div className='row'>
              <div className='col-6 col-sm-2 col-md-2 col-lg-2 col-xl-12 mx-auto'>
                <a
                  className='team-homepage'
                  href={`https://${team.strWebsite}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className='image-fluid'
                    id='team-logo'
                    src={team.strTeamBadge}
                    alt={`${team.strTeam} badge logo`}
                    style={{ maxWidth: '100%', maxHeight: 'auto' }}
                  />
                </a>
              </div>
              <div className='col-12 col-sm-10 col-lg-12 d-flex my-auto justify-content-evenly social-media-icons'>
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
          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4' id='team-info'>
            <div className='row' id='inner-row-1'>
              <div className='col-12 col-lg-12 chart mt-4' id='goals-chart'>
                <TeamStats teamID={team.idTeam} />
              </div>
              <div className='col' id='fan-art'>
                <h2>Fan Art</h2>
                <img
                  className='image-fluid transition-fade'
                  src={fanArtImages[currentImageIndex]}
                  alt={`${team.strTeam} - Fan Arts`}
                  style={{ maxWidth: '100%', maxHeight: 'auto' }}
                />
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-6 col-xl-4'>
            <div className='row' id='inner-row-2'>
              <div
                className='col-12 col-sm-12 col-md-12 col-lg-12 mt-4 p-2 p-sm-4'
                id='team-players'
              >
                <TeamRoster teamName={team.strTeam} />
              </div>
              <div className='col mt-1 p-2 p-sm-4' id='team-schedule'>
                <TeamsSchedule teamID={team.idTeam} />
              </div>
            </div>
          </div>
          <div className='col-12 col-xl-2'>
            <img
              className='image-fluid mx-auto'
              id='team-stadium-img'
              src={team.strStadiumThumb}
              alt={`${team.strTeam} stadium`}
            />
            <p>Country: {team.strCountry}</p>
            <p>Formed Year: {team.intFormedYear}</p>
            <p>Stadium: {team.strStadiumLocation}</p>
            <p>Stadium Capacity: {team.intStadiumCapacity}</p>
          </div>
        </div>
      </div>
    </>
  );
}
