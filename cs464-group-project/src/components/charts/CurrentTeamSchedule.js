import * as React from 'react';
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
import { getTheme } from '@table-library/react-table-library/baseline';

export const UpcomingSchedule = ({ team, teamID }) => {
  const teamSchedule = team.teamSchedule.events;
  const data = { nodes: teamSchedule };

  const theme = useTheme(getTheme());

  return (
    <div className='table-container border border-3 rounded-2'>
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
                  <Cell className='schedule-style'>{item.dateEvent}</Cell>
                  {item.idHomeTeam === teamID ? (
                    <Cell className='schedule-style'>
                      vs {item.strAwayTeam}
                    </Cell>
                  ) : (
                    <Cell className='schedule-style'>
                      {' '}
                      @ {item.strHomeTeam}
                    </Cell>
                  )}
                  <Cell className='schedule-style'>{item.strTime}</Cell>
                  <Cell className='schedule-style'>{item.strVenue}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};
