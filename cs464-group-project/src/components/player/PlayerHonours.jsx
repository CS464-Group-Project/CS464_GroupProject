import React, { useState, useEffect } from 'react';
import { getHonoursById } from '../Api/ApiRequest';
import { getPlayerHonoursById } from 'thesportsdb';

export function PlayerHonours({ id }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const honoursResponse = await getHonoursById(id);
        console.log(honoursResponse);
      } catch (err) {
        console.error('Error getting honours', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3>Career Honours</h3>
      <div></div>
    </>
  );
}
