// API key
const apiKey = process.env.REACT_APP_API_KEY;
const theSportsDB = require('thesportsdb');

theSportsDB.setApiKey(apiKey);

// To look up API calls, Go to node_modules/thesportdb/index.js
// or https://github.com/gpsanant/theSportsDB/blob/master/index.js

export async function getAllPlayersByTeam(teamName) {
  return await theSportsDB.getAllPlayersByTeam(teamName);
}

async function getTeamsByLeagueName(leagueName) {
  return await theSportsDB.getTeamsByLeagueName(leagueName);
}

export async function getPlayerDetails(playerId) {
  return await theSportsDB.getPlayerDetailsById(playerId);
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

export async function getNextLeagueEvents(leagueId) {
  try {
    return await theSportsDB.getNext15EventsByLeagueId(leagueId);
  } catch (error) {
    console.error('Error getting team names:', error.message);
    throw error;
  }
}
