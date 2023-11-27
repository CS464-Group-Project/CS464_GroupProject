import thesportsdb from 'thesportsdb';
import axios from 'axios';

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

export async function getTeamByName(teamName) {
  return await theSportsDB.getTeamByName(teamName);
}

export async function getPlayerContractsById(id) {
  try {
    return await theSportsDB.getPlayerContractsById(id);
  } catch (error) {
    console.error('Error getting contract data: '.error.message);
    throw error;
  }
}

export async function getHonoursById(id) {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookuphonours.php?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting honours data: ${error.message}`);
    throw error;
  }
}

export async function getMilestonessById(id) {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookupmilestones.php?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting milestone data: ${error.message}`);
    throw error;
  }
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
        logo: team.strTeamLogo,
      }));
    } catch (error) {
      console.error('Error getting team names:', error.message);
      throw error;
    }
  } else {
    return allTeamLogos;
  }
}

export { allTeamLogos };
