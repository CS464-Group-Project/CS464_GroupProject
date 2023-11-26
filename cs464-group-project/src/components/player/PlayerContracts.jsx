import React, { useState, useEffect } from 'react';
import { getPlayerContractsById } from '../../components/Api/ApiRequest';
import { ContractTimeline } from '../charts/ContractTimeline';

export function PlayerContracts({ id }) {
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractResponse = await getPlayerContractsById(id);
        setContract(contractResponse);
      } catch (err) {
        console.error('Error getting contract data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3>Contract Timeline</h3>
      <div>{contract && <ContractTimeline contracts={contract} />}</div>
    </>
  );
}
