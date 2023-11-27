// Table.js
import React from 'react';

const Table = ({ ranking }) => {
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

  return (
    <div className='team-ranking'>
      <h2>Team Rankings</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Wins</th>
            <th>Loss</th>
            <th>
              <div className='pts-header'>
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
            <tr key={team.id} className={getTeamClass(index)}>
              <td>{team.rank}</td>
              <td className='team-cell'>
                <img
                  src={team.logo}
                  alt={`${team.name} Logo`}
                  className='team-logo'
                />
                <div>{team.name}</div>
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
};

export default Table;
