import React, { useState, useEffect } from 'react';
import { getHonoursById, getMilestonessById } from '../Api/ApiRequest';
import { HonoursTable } from '../charts/HonoursTable';

export function PlayerHonours({ id }) {
  const [honours, setHonours] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHonoursById(id);
        setHonours(response);
      } catch (err) {
        console.error('Error getting honours', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3>Career Honours</h3>
      <div>
        <HonoursTable honours={honours} />
      </div>
    </>
  );
}
