import React, { useState, useEffect } from 'react';
import {
  getFormerTeams,
  getPlayerContractsById,
} from '../../../Api/ApiRequest';
import { FormerTeamTimeline } from '../Charts/FormerTeamTimeline';

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

    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        {formerTeams && contract && (
          <FormerTeamTimeline formerTeams={formerTeams} contracts={contract} />
        )}
      </div>
    </div>
  );
}
