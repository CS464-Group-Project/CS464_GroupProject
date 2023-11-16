import React, { useEffect, useState } from 'react';
import { getTeamsByLeagueName } from '../../components/Api/ApiRequest';
import { Link } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;

async function getAllTeamNames() {
  const leagueName = 'English Premier League';
  try {
    const data = await getTeamsByLeagueName(leagueName);
    const teams = data.teams;

    if (teams && teams.length > 0) {
      const teamNames = teams.map((team) => team.strTeam);
      console.log('Team Names:', teamNames);
      return teamNames;
    } else {
      console.log('No teams found in the API response');
      return [];
    }
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export function Player() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPlayers([]);
    async function fetchPlayers() {
      try {
        setPlayers([]); // Clear players before fetching new ones

        const teamNames = await getAllTeamNames();
        let uniquePlayers = new Set(); // Use Set to store unique players

        for (const teamName of teamNames) {
          const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/${apiKey}/searchplayers.php?t=${teamName}`
          );

          if (response.ok) {
            const data = await response.json();

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
    player.strPlayer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Players</h1>
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px', padding: '5px' }}
      />
      <div id="players" style={{ display: 'flex', flexWrap: 'wrap' }}>
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
