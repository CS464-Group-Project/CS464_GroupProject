import React from 'react';
import Match from './Match';
import '../../style/Home/HomeComps.css'; // Import your CSS file

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', weekday: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function PastMatchTable({ date, matches }) {
  console.log(matches);
  return (
    <div className='past-match-container' key={date}>
      <h2 className='match-date'>{formatDate(date)}</h2>
      <ul className='match-list'>
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </ul>
    </div>
  );
}

export default PastMatchTable;
