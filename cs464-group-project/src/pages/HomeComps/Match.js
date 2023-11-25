import React from 'react';

function Match({ match }) {
  //need to extract logos from the allTeamLogos array

  return (
    <li key={match.id} className='match-item'>
      <div className='team-names'>
        <div className='team-info'>{match.homeName}</div>
        <div className='team-info'>{match.awayName}</div>
      </div>
      <div className='match-scores'>
        <div className='team-info'>{match.homeScore}</div>
        <div className='team-info'>{match.awayScore}</div>
      </div>
    </li>
  );
}

export default Match;
