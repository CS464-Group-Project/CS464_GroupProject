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

export const UpcomingSchedule = ({ team, teamID }) => {
  const teamSchedule = team.teamSchedule.events;
  const data = { nodes: teamSchedule };
  const theme = useTheme(getTheme());

  return (
    <div className='table-container'>
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Opponent</HeaderCell>
                <HeaderCell>Time</HeaderCell>
                <HeaderCell>Stadium</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.dateEvent} item={item}>
                  <Cell>{item.dateEvent}</Cell>
                  {item.idHomeTeam === teamID ? (
                    <Cell>vs {item.strAwayTeam}</Cell>
                  ) : (
                    <Cell> @ {item.strHomeTeam}</Cell>
                  )}
                  <Cell>{item.strTime}</Cell>
                  <Cell>{item.strVenue}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};
