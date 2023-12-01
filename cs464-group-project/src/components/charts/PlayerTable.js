import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Team.css';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

export const PlayerTable = ({ player }) => {
  const navigate = useNavigate();
  const data = { nodes: player.players };

  const THEME = {
    Table: `
      height: 100%;
      `,

    HeaderCell: `
      padding-left: 8px;
      padding-top: 3px;
      padding-bottom: 3px;
      `,

    Cell: `
      cursor: pointer;
      background-color: #ffffff;
      font-family: 'Roboto', sans-serif;
      padding-left: 8px;
      padding-top: 3px;
      padding-bottom: 3px;
      border-bottom: 1px solid #f0f0f0;
      &:hover {
        background-color: #f5f5f5;
        color: black;
        font-weight: bold;
      }`,
  };

  const theme = useTheme(THEME);

  const handlePlayerClick = (playerId) => {
    navigate(`/individualplayer/${playerId}`);
  };

  return (
    <div className='border border-3 rounded-2' style={{ height: '300px' }}>
      <Table className='table-style' data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Player</HeaderCell>
                <HeaderCell>Position</HeaderCell>
              </HeaderRow>
            </Header>

            <Body className='body-style'>
              {tableList.map((item) => (
                <Row key={item.idPlayer} className='row-style' item={item}>
                  <Cell
                    className='roster-style'
                    onClick={() => handlePlayerClick(item.idPlayer)}
                  >
                    {item.strPlayer}
                  </Cell>
                  <Cell className='roster-style'>{item.strPosition}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};
