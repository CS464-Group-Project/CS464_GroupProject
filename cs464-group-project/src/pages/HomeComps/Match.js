import React from 'react';

function Match({ match }) {
  return (
    <li key={match.id} className='match-item'>
      <div className='team-names'>
        <div className='team-info team-cell'>
          <img
            src={match.homeLogo}
            className='team-logo'
            alt={`${match.homeName} Logo`}
          ></img>
          <div>{match.homeName}</div>
        </div>
        <div className='team-info team-cell'>
          <img
            src={match.awayLogo}
            className='team-logo'
            alt={`${match.awayName} Logo`}
          ></img>
          <div className='team-info'>{match.awayName}</div>
        </div>
      </div>
      <div className='match-scores'>
        <div className='team-info'>{match.homeScore}</div>
        <div className='team-info'>{match.awayScore}</div>
      </div>
    </li>
  );
}

export default Match;
