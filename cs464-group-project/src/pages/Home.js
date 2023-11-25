import React, { useEffect } from 'react';
import { allTeamLogos, getTeamLogos } from '../components/Api/ApiRequest';

export function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(allTeamLogos);
      } catch (error) {
        console.error('Error fetching team logos:', error.message);
      }
    }

    fetchData();
  }, []);
  return (
    <h1>
      <img
        className='league-logo'
        src='/Images/premierleague_logo.png'
        alt='Premier League Logo'
      />
      Welcome to the Premier League
    </h1>
  );
}
