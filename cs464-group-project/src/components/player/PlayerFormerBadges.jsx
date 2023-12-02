import React, { useState, useEffect } from 'react';
import { getFormerTeams } from '../../components/Api/ApiRequest';

export function PlayerFormerBadges({ id }) {
  const [formerTeams, setFormerTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formerResponse = await getFormerTeams(id);

        setFormerTeams(formerResponse.formerteams);
      } catch {
        console.log('No former teams');
      }
    };

    fetchData();
  }, [id]);

  const uniqueKeys = new Set();

  if (formerTeams) {
    return (
      <div>
        <h2>Former Teams</h2>
        <div className='d-flex flex-wrap justify-content-evenly'>
          {formerTeams.map((team) => {
            const key = team.idFormerTeam;

            //Check for duplicates of the same team
            if (uniqueKeys.has(key)) {
              return null;
            }
            uniqueKeys.add(key);
            return (
              <img
                key={team.idFormerTeam}
                src={team.strTeamBadge}
                alt={`${team.strFormerTeam} Team Badge`}
                style={{ width: '33%', height: 'auto' }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
