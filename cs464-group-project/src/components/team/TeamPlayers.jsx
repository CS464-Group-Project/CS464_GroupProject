import React from 'react';
import { getAllPlayersByTeam } from '../../componentes/Api/ApiRequest';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function TeamPlayers() {
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { team } = location.state;
        setTeam(team);
        const playerInfo = await getAllPlayersByTeam(team.strTeam);
        setPlayers(playerInfo.player);
      } catch (err) {
        console.error('Error getting player information', err);
      }
    };
    fetchData();
  }, [location.state]);

  console.log('team: ' + team);
  console.log('players: ' + players);

  return <div>TeamPlayers</div>;
}
