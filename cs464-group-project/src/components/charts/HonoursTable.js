import React from 'react';
import '../../style/Player.css';

export const HonoursTable = ({ honours }) => {
  if (honours) {
    const data = honours.honours;
    if (data === null) {
      console.log('bad');
    }
    return (
      <table className='honours-table'>
        <thead>
          <tr>
            <th>Honour</th>
            <th>Season</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {!data ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                No Career Honours
              </td>
            </tr>
          ) : (
            data.map((honour) => (
              <tr key={honour.id}>
                <td>{honour.strHonour}</td>
                <td>{honour.strSeason}</td>
                <td>{honour.strTeam}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
};
