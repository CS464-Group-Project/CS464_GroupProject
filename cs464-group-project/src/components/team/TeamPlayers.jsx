import React from 'react';
import { getAllPlayersByTeam } from '../../components/Api/ApiRequest';
import { useState, useEffect } from 'react';
import { PlayerTable } from '../charts/PlayerTable';

export function TeamPlayers({ teamName }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheData = localStorage.getItem('playerInfo');

        if (cacheData) {
          const cacheDataObject = JSON.parse(cacheData);
          setPlayers(cacheDataObject);
        } else {
          const playerInfo = await getAllPlayersByTeam(teamName);
          setPlayers(playerInfo.player);
          const dataString = JSON.stringify(playerInfo);
          localStorage.setItem('playerInfo', dataString);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error getting player information', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [teamName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>Current Roster</h3>
      <div>
        <PlayerTable player={{ players }} />
      </div>
    </>
  );
}
