import React, { useState, useEffect } from 'react';
import { fetchData } from '../components/Api/ApiRequest';
import '../style/Team.css';

export function Team() {
  const [displayTeams, setDisplayTeams] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setDisplayTeams(data.teams);
      })
      .catch((error) => {
        console.error('Error fetching teams: ', error);
      });
  }, []);

  return (
    <div className="background">
      <h1>
        <img
          className="league-logo"
          src="/Images/premierleague_logo.png"
          alt="Premier League Logo"
        />
        Welcome to the Premier League
      </h1>
      <div className="flex container text-center">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {displayTeams.map((team) => (
            <div key={team.idTeam} className="card col">
              <img
                className="mx-auto image-fluid"
                src={team.strTeamLogo}
                alt={`${team.strTeam} Logo`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div>
                <p className="team-name" key={team.idTeam}>
                  {team.strTeam}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
