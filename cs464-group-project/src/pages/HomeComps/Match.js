import React from 'react';

function Match({ match }) {
  return (
    <li key={match.id} className='match-item'>
      <div className='team-names'>
        <div className='match-home team-cell'>
          <img
            src={match.homeLogo}
            className='team-logo'
            alt={`${match.homeName} Logo`}
          ></img>
          <div className='match-name'>{match.homeName}</div>
          <div className='match-home-score'>{match.homeScore}</div>
        </div>
        <div className='match-away team-cell'>
          <img
            src={match.awayLogo}
            className='match-away-logo'
            alt={`${match.awayName} Logo`}
          ></img>
          <div className='match-name'>{match.awayName}</div>
          <div className='match-away-score'>{match.awayScore}</div>
        </div>
      </div>
    </li>
  );
}

export default Match;
