import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerDetails } from '../../components/Api/ApiRequest';

export function IndividualPlayer() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlayerDetails(id);
        setPlayerData(response.players[0]);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchData();
  }, [id]);

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
            <h2>{playerData.strPlayer}</h2>
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
