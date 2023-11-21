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

export const UpcomingSchedule = ({ team, teamID }) => {
  const navigate = useNavigate();
  const teamSchedule = team.teamSchedule.events;
  const data = { nodes: teamSchedule };

  const THEME = {
    Cell: `
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
      color: black;
    }`,
  };

  const theme = useTheme(THEME);

  // To implement
  const handleTeamClick = (teamName) => {
    console.log('team name: ', teamName);
    // navigate(`/individualteam/${teamName}`);
  };

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
                  <Cell className='schedule-style'>{item.dateEvent}</Cell>
                  {item.idHomeTeam === teamID ? (
                    <Cell
                      className='schedule-style'
                      onClick={() => handleTeamClick(item.strAwayTeam)}
                    >
                      vs {item.strAwayTeam}
                    </Cell>
                  ) : (
                    <Cell
                      className='schedule-style'
                      onClick={() => handleTeamClick(item.strAwayTeam)}
                    >
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
