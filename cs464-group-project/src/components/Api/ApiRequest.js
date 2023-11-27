// API key
const apiKey = process.env.REACT_APP_API_KEY;
const theSportsDB = require('thesportsdb');

theSportsDB.setApiKey(apiKey);

// To look up API calls, Go to node_modules/thesportdb/index.js
// or https://github.com/gpsanant/theSportsDB/blob/master/index.js

export async function getAllPlayersByTeam(teamName) {
  return await theSportsDB.getAllPlayersByTeam(teamName);
}

export async function getPlayerDetails(playerId) {
  return await theSportsDB.getPlayerDetailsById(playerId);
}

export async function getLeagueDetails(leagueId) {
  return await theSportsDB.getLeagueDetailsById(leagueId);
}

export async function getLookUpTable(id, season) {
  return await theSportsDB.getLookupTableByLeagueIdAndSeason(id, season);
}

// Retrieve teams upcoming schedules
export async function getUpcomingSchedule(teamId) {
  return await theSportsDB.getNext5EventsByTeamId(teamId);
}

async function getTeamsByLeagueName(leagueName) {
  return await theSportsDB.getTeamsByLeagueName(leagueName);
}

export async function getAllTeamNames() {
  const leagueName = 'English Premier League';
  try {
    return await getTeamsByLeagueName(leagueName);
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export async function getPLTeamDetails(teamId) {
  try {
    return await theSportsDB.getTeamDetailsById(teamId);
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export async function getSeasonStats(leagueId, year) {
  try {
    return await theSportsDB.getLookupTableByLeagueIdAndSeason(leagueId, year);
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export async function getPLPastMatches(leagueId) {
  try {
    return await theSportsDB.getPast15EventsByLeagueId(leagueId);
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export async function getPLLiveScores() {
  try {
    return await theSportsDB.getLivescoresBySport('soccer');
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}

export async function getTeamByName(teamName) {
  return await theSportsDB.getTeamByName(teamName);
}

export async function getHistoryLeagues() {
  return await theSportsDB.getTeamDetailsById(133602);
}

let allTeamLogos = null;
export async function getTeamLogos() {
  //if empty do the call
  if (allTeamLogos === null) {
    try {
      const data = await getAllTeamNames();
      allTeamLogos = data.teams.map((team) => ({
        id: team.idTeam,
        name: team.strTeam,
        logo: team.strTeamBadge,
      }));
      return allTeamLogos;
    } catch (error) {
      console.error('Error getting team names:', error.message);
      throw error;
    }
  } else {
    return allTeamLogos;
  }
}

export { allTeamLogos };
