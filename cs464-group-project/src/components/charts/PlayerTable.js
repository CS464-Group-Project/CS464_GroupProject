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
    Table: `height: 100%`,

    HeaderCell: `
      background-color: blue;`,

    Cell: `
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
        color: black;
      }`,
  };

  const theme = useTheme(THEME);

  const handlePlayerClick = (playerId) => {
    navigate(`/individualplayer/${playerId}`);
  };

  return (
    <div style={{ height: '300px' }}>
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Player</HeaderCell>
                <HeaderCell>Position</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
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
