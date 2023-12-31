import React from 'react';
import { getAllPlayersByTeam } from '../Api/ApiRequest';
import { useState, useEffect } from 'react';
import { PlayerTable } from '../charts/PlayerTable';

export function TeamRoster({ teamName }) {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const playerInfo = await getAllPlayersByTeam(teamName);

        if (isMounted) {
          setPlayers(playerInfo.player);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error getting player information', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [teamName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Current Roster</h2>
      <div>
        <PlayerTable player={{ players }} />
      </div>
    </>
  );
}
