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
