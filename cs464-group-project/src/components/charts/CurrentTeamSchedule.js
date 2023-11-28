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

  function handleDisplayDate(dateString) {
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  function handleDisplayTime(timeString) {
    const inputDate = new Date(timeString);
    const pstOptions = {
      timeZone: 'America/Los_Angeles',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    const pstTime = new Intl.DateTimeFormat('en-US', pstOptions).format(
      inputDate,
    );
    return pstTime;
  }

  return (
    <div className='table-container border border-3 rounded-2'>
      <Table className='mb-0' data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Opponent</HeaderCell>
                <HeaderCell>Time</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.dateEvent} item={item}>
                  <Cell className='schedule-style'>
                    {handleDisplayDate(item.strTimestamp)}
                  </Cell>
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
                  <Cell className='schedule-style'>
                    {handleDisplayTime(item.strTimestamp)}
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};
