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

export const PreviousMatches = ({ team, teamID }) => {
  const prevMatches = team.prevMatches.results;
  const data = { nodes: prevMatches };

  const theme = useTheme(getTheme());

  function handleDisplayDate(dateString) {
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  function handleOutcome(item) {
    switch (true) {
      case item.intHomeScore > item.intAwayScore && item.idHomeTeam === teamID:
      case item.intAwayScore > item.intHomeScore && item.idAwayTeam === teamID:
        return 'W';
      case item.intHomeScore === item.intAwayScore:
        return 'D';
      default:
        return 'L';
    }
  }

  function getOutcomeColor(outcome) {
    switch (outcome) {
      case 'W':
        return 'win-color';
      case 'D':
        return 'draw-color';
      case 'L':
        return 'loss-color';
      default:
        return '';
    }
  }

  function displayScores(item) {
    let score = `${item.intHomeScore} - ${item.intAwayScore}`;
    return score;
  }

  return (
    <div className='table-container border border-3 rounded-2'>
      <Table className='mb-0' data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className='header-cell' resize>
                  Date
                </HeaderCell>
                <HeaderCell className='header-cell' resize>
                  Opponent
                </HeaderCell>
                <HeaderCell className='header-cell' id='outcome-header'>
                  Outcome
                </HeaderCell>
                <HeaderCell className='header-cell' id='score-header'>
                  Score
                </HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.idEvent} item={item}>
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
                  <Cell
                    className={`schedule-style ${getOutcomeColor(
                      handleOutcome(item),
                    )}`}
                    id='outcome'
                  >
                    {handleOutcome(item)}
                  </Cell>
                  <Cell className='schedule-style' id='scores'>
                    {displayScores(item)}
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
