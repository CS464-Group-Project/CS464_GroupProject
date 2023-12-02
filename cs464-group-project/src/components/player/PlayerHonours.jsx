import React, { useState, useEffect } from 'react';
import { getHonoursById } from '../Api/ApiRequest';
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
  }, [id]);

  return (
    <>
      <h2>Career Honours</h2>
      <div>
        <HonoursTable honours={honours} />
      </div>
    </>
  );
}
