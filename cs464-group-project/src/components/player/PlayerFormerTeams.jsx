import React, { useState, useEffect } from 'react';
import {
  getFormerTeams,
  getPlayerContractsById,
} from '../../components/Api/ApiRequest';
import { FormerTeamTimeline } from '../charts/FormerTeamTimeline';

export function PlayerFormerTeams({ id }) {
  const [formerTeams, setFormerTeams] = useState([]);
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formerResponse = await getFormerTeams(id);
        const contractResponse = await getPlayerContractsById(id);
        setContract(contractResponse.contracts);
        setFormerTeams(formerResponse.formerteams);
      } catch (err) {
        console.error('Error getting  former teams or contracts', err);
      }
    };
    console.log(formerTeams);
    fetchData();
  }, []);

  const uniqueKeys = new Set();

  return (
    <>
      <h3>Former Teams</h3>
      <div>
        {formerTeams && contract && (
          <FormerTeamTimeline formerTeams={formerTeams} contracts={contract} />
        )}
        <div>
          {' '}
          <div className='col d-flex mt-3 justify-content-evenly'>
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
                  style={{ width: '10%', height: 'auto', margin: '5px' }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
