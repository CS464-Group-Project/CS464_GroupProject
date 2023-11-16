import React, { useEffect, useState } from 'react';
import {
  getAllTeamNames,
  getAllPlayersByTeam,
} from '../../components/Api/ApiRequest';
import { Link } from 'react-router-dom';

export function Player() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPlayers([]);
    async function fetchPlayers() {
      try {
        setPlayers([]); // Clear players before fetching new ones

        const teamNames = await getAllTeamNames();
        const teams = teamNames.teams || [];

        let uniquePlayers = new Set(); // Use Set to store unique players

        for (const team of teams) {
          const teamName = team.strTeam;
          const response = await getAllPlayersByTeam(teamName);

          if (!response.ok) {
            const data = response;

            // Add new players to the Set
            data.player.forEach((newPlayer) => {
              uniquePlayers.add(newPlayer);
            });
          } else {
            console.error(`Failed to fetch player data for team ${teamName}`);
          }
        }

        // Convert Set back to an array and set the state
        setPlayers([...uniquePlayers]);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.strPlayer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1>Players</h1>
      <input
        type='text'
        placeholder='Search players...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px', padding: '5px' }}
      />
      <div id='players' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredPlayers.map((player) => {
          const key = `${player.strPosition}-${player.strTeam}-${player.idPlayer}`;

          return (
            <div
              key={key}
              data-key={key}
              style={{
                flex: '0 0 calc(25% - 16px)',
                margin: '8px',
                textAlign: 'center',
              }}
            >
              <Link to={`/IndividualPlayer/${player.idPlayer}`}>
                <img
                  src={player.strThumb}
                  alt={`${player.strPlayer}`}
                  style={{
                    width: '100%',
                    maxWidth: '150px',
                  }}
                />
              </Link>
              <p>
                <strong>{player.strPlayer}</strong>
              </p>
              <p>Position: {player.strPosition}</p>
              <p>Team: {player.strTeam}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
