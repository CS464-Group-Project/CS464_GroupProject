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
        console.log('incoming prop: ', teamName);
        const playerInfo = await getAllPlayersByTeam(teamName);
        setPlayers(playerInfo.player);
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
  console.log('players22: ', players);

  return (
    <>
      <h3>Current Roster</h3>
      <div>
        {setTimeout(() => {
          return <PlayerTable player={{ players }} />;
        }, 5000)}
      </div>
    </>
  );
}
