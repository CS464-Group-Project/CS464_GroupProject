import React, { useEffect, useState } from 'react';
import {
  getAllTeamNames,
  getAllPlayersByTeam,
} from '../../components/Api/ApiRequest';
import { Link } from 'react-router-dom';

export function Player() {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [randomPlayers, setRandomPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    setPlayers([]);
    async function fetchPlayers() {
      try {
        setPlayers([]); // Clear players before fetching new ones

        const teamNames = await getAllTeamNames();
        const teams = teamNames.teams || [];
        setTeamNames(teams);

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
        setAllPlayers([...uniquePlayers]);

        //Randomize and select 20 players to be initially rendered
        setRandomPlayers(randomize([...allPlayers]).slice(0, 20));

        setPlayers(randomPlayers);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    //Helper function to randomize the array of players
    function randomize(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      console.log('randomised');
      return array;
    }

    fetchPlayers();
  }, []);

  async function selectTeam(event) {
    setSelectedTeam(event.target.value);

    try {
      if (selectTeam == 'Random') {
        setPlayers(randomPlayers);
      } else {
        const response = await getAllPlayersByTeam(selectTeam); // Fetch players for the selected team

        if (!response.ok) {
          const data = response;
          setPlayers(response.player || []);
        } else {
          console.error(`Failed to fetch player data for team ${selectTeam}`);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const filteredPlayers = allPlayers.filter((player) =>
    player.strPlayer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderedPlayers = searchTerm ? filteredPlayers : players;

  return (
    <div className='container'>
      <h1 className='mt-3'>Players</h1>
      <div className='row'>
        {/*Player Search*/}
        <div className='col-md-6 mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search players...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/*Team Select*/}
        <div className='col-md-6 mb-3'>
          <div className='input-group'>
            <label htmlFor='teamOptions'>Select a team:</label>
            <select id='teamOptions' onChange={selectTeam} value={selectedTeam}>
              <option value='' disabled>
                Team:
              </option>
              <option value='Random'>Random</option>
              {teamNames.map((team) => (
                <option key={team.idTeam} value={team.strTeam}>
                  {team.strTeam}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='d-flex flex-wrap'>
          {renderedPlayers.map((player) => {
            const key = `${player.strTeam}-${player.idPlayer}`;

            return (
              <div key={key} data-key={key} className='col-md-3 mb-3'>
                <Link to={`/IndividualPlayer/${player.idPlayer}`}>
                  <img
                    src={player.strThumb}
                    alt={`${player.strPlayer}`}
                    className='img-fluid'
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
    </div>
  );
}
