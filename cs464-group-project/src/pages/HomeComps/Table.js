// Table.js
import React from 'react';
import '../../style/Home/Table.css';

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
    <div className='team-ranking row'>
      <div className='ranking-header info-header row'>
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
      <table className='m-auto'>
        <thead>
          <tr className='row container-fluid'>
            <th className='col-sm-2'>Rank</th>
            <th className='col-sm-4'>Team</th>
            <th className='col-sm-2'>Wins</th>
            <th className='col-sm-2'>Loss</th>
            <th className='col-sm-2'>Points</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((team, index) => (
            // Assign different class name for top 4 teams, 5th team, bottom 3
            <tr
              key={team.id}
              className={`cell-left ${getTeamClass(index)} row container-fluid`}
            >
              <td className='col-sm-2'>{team.rank}</td>
              <td className='team-cell col-sm-4'>
                <img
                  src={team.logo}
                  alt={`${team.name} Logo`}
                  className='team-logo'
                />
                <div>{team.name}</div>
              </td>
              <td className='col-sm-2'>{team.wins}</td>
              <td className='col-sm-2'>{team.loss}</td>
              <td className='col-sm-2'>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
