import React, { useEffect, useState } from 'react';
import { fetchData } from '../components/Api/ApiRequest';
import { Link } from 'react-router-dom';
/*
async function getTeamNames() {
try {
  const data = await fetchData();
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
*/
export function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        //const teamNames = await getTeamNames();
        const teamNames = ['Arsenal']; //For testing purposes

        // Loop through each team and fetch players
        for (const teamName of teamNames) {
          const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${teamName}`
          );

          if (response.ok) {
            const data = await response.json();
            // Concatenate players for each team
            setPlayers((prevPlayers) => [...prevPlayers, ...data.player]);
          } else {
            console.error(`Failed to fetch player data for team ${teamName}`);
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Players</h1>
      <div id="players" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {players.map((player) => {
          const key = `${player.strPosition}-${player.strTeam}-${player.idPlayer}`;

          // Check for duplicate keys
          if (document.querySelectorAll(`[data-key="${key}"]`).length > 0) {
            console.error(
              `Duplicate key found for player: ${player.strPlayer}`
            );
          }

          return (
            <div
              key={key}
              data-key={key}
              style={{
                flex: '0 0 calc(33.333% - 16px)', // Adjust the width as needed
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
                    maxWidth: '100px',
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
