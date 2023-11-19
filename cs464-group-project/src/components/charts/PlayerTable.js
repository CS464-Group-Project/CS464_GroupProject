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
import { getTheme } from '@table-library/react-table-library/baseline';

export const PlayerTable = ({ player }) => {
  const data = { nodes: player };
  const theme = useTheme(getTheme());

  console.log('Players02: ', player);

  return (
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
  );
};
