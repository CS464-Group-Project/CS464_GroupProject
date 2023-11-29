import React from 'react';
import Match from './Match';
import '../../style/Home/HomeComps.css'; // Import your CSS file

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', weekday: 'long' };
  const myDate = new Date(dateString).toLocaleDateString('en-US', options);
  //getting Sunday, Nov 26
  //so we can use split to parse the date
  const splitDate = myDate.split(', ');

  return (
    <>
      <div>{splitDate[0]}</div>
      <div>{splitDate[1]}</div>
    </>
  );
}

function PastMatchTable({ date, matches }) {
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
