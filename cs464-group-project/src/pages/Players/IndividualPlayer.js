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
    <div style={{ display: 'flex', margin: '20px' }}>
      {playerData ? (
        <>
          {/* Left side with player image */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <img
              src={playerData.strThumb}
              alt={`${playerData.strPlayer}`}
              style={{
                width: '100%',
                maxWidth: '100%',
              }}
            />
          </div>

          {/* Right side with player details */}
          <div style={{ flex: 1 }}>
            <h2>{playerData.strPlayer}</h2>
            <p>Team: {playerData.strTeam}</p>
            <p>Country: {playerData.strNationality}</p>
            <p>Position: {playerData.strPosition}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
