import React, { useEffect, useState } from 'react';
import {
  getAllTeamNames,
  getAllPlayersByTeam,
} from '../../components/Api/ApiRequest';
import { Link } from 'react-router-dom';
import '../../style/Player.css';

export function Player() {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [randomPlayers, setRandomPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamNames, setTeamNames] = useState([]);
  let teamCache = {};

  useEffect(() => {
    setPlayers([]);
    async function fetchPlayers() {
      try {
        setPlayers([]); // Clear players before fetching new ones

        const teamNames = await getAllTeamNames();
        const teams = teamNames.teams || [];
        setTeamNames(teams);

        const teamPromises = teams.map(async (team) => {
          const teamName = team.strTeam;
          const response = await getAllPlayersByTeam(teamName);

          if (!response.ok) {
            return response.player || [];
          } else {
            console.error(`Failed to fetch player data for team ${teamName}`);
            return [];
          }
        });

        const teamResponses = await Promise.all(teamPromises);
        const allPlayers = teamResponses.flat();

        // Convert Set back to an array and set the state
        setAllPlayers([...new Set(allPlayers)]);

        //Randomize and select 20 players to be initially rendered
        const shuffledPlayers = randomize(allPlayers);
        const selectedPlayers = shuffledPlayers.slice(0, 20);

        setPlayers(selectedPlayers);
        setRandomPlayers(selectedPlayers);
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
      return array;
    }

    fetchPlayers();
  }, []);

  async function selectTeam(event) {
    setSelectedTeam(event.target.value);
    const team = event.target.value;

    try {
      if (team === 'Random') {
        setPlayers(randomPlayers);
      } else {
        if (teamCache[team]) {
          setPlayers(teamCache[team]);
        } else {
          const response = await getAllPlayersByTeam(team); // Fetch players for the selected team

          if (!response.ok) {
            setPlayers(response.player || []);
            teamCache = response.player;
          } else {
            console.error(`Failed to fetch player data for team ${team}`);
          }
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
    <div className='background'>
      <h1 className='mt-3'>Players</h1>
      <div className='row'>
        {/*Player Search*/}
        <div className='col-md-9 mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search players...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/*Team Select*/}
        <div className='col-md-3 mb-3'>
          <div className='input-group'>
            <label htmlFor='teamOptions'></label>
            <select
              id='teamOptions'
              onChange={selectTeam}
              value={selectedTeam}
              style={{ width: '100%' }}
            >
              <option value='' disabled>
                Select a team
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

        <div className=' d-flex flex-wrap'>
          {renderedPlayers.map((player) => {
            const key = `${player.strTeam}-${player.idPlayer}`;

            return (
              <div
                key={key}
                data-key={key}
                className='col-lg-3 col-md-3 col-sm-6 col-6 mb-3'
              >
                <Link
                  to={`/IndividualPlayer/${player.idPlayer}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className='flex container-md card '>
                    <img
                      src={player.strThumb}
                      alt={`${player.strPlayer}`}
                      className='img-fluid'
                      style={{ margin: '10px 0' }}
                    />

                    <p
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        color: 'black',
                      }}
                    >
                      {player.strPlayer}
                    </p>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'black',
                      }}
                    >
                      <strong>Position:</strong> {player.strPosition}
                    </p>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'black',
                      }}
                    >
                      <strong>Team: </strong>
                      {player.strTeam}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
