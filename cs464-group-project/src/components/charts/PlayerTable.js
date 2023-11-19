import * as React from 'react';

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
  console.log('Player Input: ', player);
  const data = { nodes: player.players };
  const theme = useTheme({
    Table: `height: 100%`,
  });

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
                <Row key={item.idPlayer} item={item}>
                  <Cell>{item.strPlayer}</Cell>
                  <Cell>{item.strPosition}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};
