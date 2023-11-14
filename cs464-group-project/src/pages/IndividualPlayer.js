import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function IndividualPlayer() {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
        );
        setPlayerData(response.data.players[0]); // Assuming the response has a 'players' array
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Individual Player</h2>
      {playerData ? (
        <div>
          <img
            src={playerData.strThumb}
            alt={`${playerData.strPlayer}`}
            style={{
              width: '100%',
              maxWidth: '100px',
            }}
          />
          <p>Player ID: {id}</p>
          <p>Name: {playerData.strPlayer}</p>
          {/* Other content */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
