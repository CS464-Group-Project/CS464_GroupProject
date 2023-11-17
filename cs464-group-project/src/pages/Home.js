import React, { useState, useEffect } from 'react';
import { getPLTeamDetails } from '../components/Api/ApiRequest';

export function Home() {
  /*
  const [allTeamsId, setAllTeamsId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPLTeamDetails();
        console.log(data);
        const teamIds = data.map((team) => team.idTeam);
        setAllTeamsId(teamIds);
        console.log(allTeamsId);
      } catch (err) {
        console.error('Error getting League information', err);
      }
    };
    fetchData();
  }, []);
  */

  return <h1>Hello Home</h1>;
}
