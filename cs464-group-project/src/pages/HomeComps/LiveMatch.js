import React from 'react';
import '../../style/Home/LiveMatch.css';

function LiveMatch({ match }) {
  return (
    <>
      <li key={match.id} className='match-item'>
        <div className='live-left'>
          <div className='circle-icon'></div>
          <div className='live-clock'>{`${match.clock}'`}</div>
          <div className='team-names'>
            <div className='team-info team-cell'>
              <img
                src={match.homeLogo}
                className='team-logo'
                alt={`${match.homeTeam} Logo`}
              ></img>
              <div>{match.homeTeam}</div>
            </div>
            <div className='team-info team-cell'>
              <img
                src={match.awayLogo}
                className='team-logo'
                alt={`${match.awayTeam} Logo`}
              ></img>
              <div className='team-info'>{match.awayTeam}</div>
            </div>
          </div>
        </div>
        <div className='match-scores'>
          <div className='team-info'>{match.homeScore}</div>
          <div className='team-info'>{match.awayScore}</div>
        </div>
      </li>
    </>
  );
}

export default LiveMatch;
