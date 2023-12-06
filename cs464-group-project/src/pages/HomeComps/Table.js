import React from 'react';
import '../../style/Home/Table.css';
import { getPLTeamDetails } from '../../components/Api/ApiRequest';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Table({ ranking }) {
  const navigate = useNavigate();
  const [displayTeams, setDisplayTeams] = useState([]);
  // Function to get team class
  const getTeamClass = (index) => {
    if (index < 4) {
      return 'champions-league';
    }
    if (index < 6) {
      return 'europa-league';
    }
    if (index === 6) {
      return 'europa-qualification';
    }
    if (index > 16) {
      return 'relegation';
    }
  };

  const routeToTeam = async (teamID) => {
    try {
      const data = await getPLTeamDetails(teamID);
      setDisplayTeams(data.teams);
      navigate(`/individualteam`, { state: { team: data.teams[0] } });
    } catch (err) {
      console.error('Error getting League information', err);
    }
  };

  return (
    <div className='team-ranking'>
      <div className='ranking-header info-header'>
        <h2>Team Rankings</h2>
        <span className='info-container'>
          <sup className='info-icon'>i</sup>
          <span className='tooltip'>
            <p>
              Different rank position qualifies in different European Leagues
            </p>
            <ul>
              <li>Top 4: Champions League (Green) </li>
              <li>5th, 6th: Europa League (Gray)</li>
              <li>7th: Europa Qualification (Blue)</li>
              <li>Bottom 3: Relegated to lower divsion (Red)</li>
            </ul>
          </span>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th className='table-header-name'>Team</th>
            <th>Wins</th>
            <th>Loss</th>
            <th>
              <div className='info-header'>
                Points
                <span className='info-container'>
                  <sup className='info-icon'>i</sup>
                  <span className='tooltip'>3 pts for wins, 1 for draws</span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((team, index) => (
            // Assign different class name for top 4 teams, 5th team, bottom 3
            <tr key={team.id} className={`cell-left ${getTeamClass(index)}`}>
              <td>{team.rank}</td>
              <td className='team-cell' onClick={() => routeToTeam(team.id)}>
                <img
                  src={team.logo}
                  alt={`${team.name} Logo`}
                  className='team-logo'
                />
                <div className='team-cell-name'>{team.name}</div>
              </td>
              <td>{team.wins}</td>
              <td>{team.loss}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
