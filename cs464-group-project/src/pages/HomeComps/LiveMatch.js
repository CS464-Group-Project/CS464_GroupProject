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
              <div className='live-home-name'>{match.homeTeam}</div>
            </div>
            <div className='team-info team-cell'>
              <img
                src={match.awayLogo}
                className='team-logo'
                alt={`${match.awayTeam} Logo`}
              ></img>
              <div className='live-away-name'>{match.awayTeam}</div>
            </div>
          </div>
        </div>

        <div className='live-scores'>
          <div className='live-home-score'>{match.homeScore}</div>
          <div className='live-away-score'>{match.awayScore}</div>
        </div>
      </li>
    </>
  );
}

export default LiveMatch;
