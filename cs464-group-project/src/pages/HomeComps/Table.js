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
    <div className='team-ranking container-fluid'>
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
      <table className='row'>
        <thead>
          <tr className='row'>
            <th className='col-2'>Rank</th>
            <th className='col-4'>Team</th>
            <th className='col-2'>Wins</th>
            <th className='col-2'>Loss</th>
            <th className='col-2'>
              <div className='info-header row'>
                <span className='table-points col-10'>Points</span>
                <span className='info-container col-2'>
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
            <tr
              key={team.id}
              className={`cell-left ${getTeamClass(index)} row`}
            >
              <td className='col-2'>{team.rank}</td>
              <td className='team-cell col-4'>
                <img
                  src={team.logo}
                  alt={`${team.name} Logo`}
                  className='team-logo'
                />
                <div>{team.name}</div>
              </td>
              <td className='col-2'>{team.wins}</td>
              <td className='col-2'>{team.loss}</td>
              <td className='col-2'>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
