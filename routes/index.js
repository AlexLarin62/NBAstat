const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const thisDay = new Date();
const thisYear = thisDay.getFullYear();
const seasons = [];
for (let i = thisYear; i > 2017; i--) {
  seasons.push(`${i - 1} - ${i}`)
}

// главная страниц
router.get('/', async (req, res) => {

  const teamsInApi = await fetch(`http://data.nba.net/prod/v1/${thisYear}/teams.json`)
  let teams = await teamsInApi.json()
  teams = teams.league.standard;

  const calenderApi = await fetch(`http://data.nba.net/prod/v1/current/standings_all.json`);
  let calendar = await calenderApi.json()
  const standings = calendar.league.standard.teams;
  res.render('index', { seasons, teams, standings, thisYear })
});

// страница со всеми игроками
router.get('/players', async (req, res) => {
  const players = await fetch(`http://data.nba.net/prod/v1/${thisYear}/players.json`)
  const allPlayersApi = await players.json()
  const allPlayers = allPlayersApi.league.standard

  res.render('allPlayers', { players: allPlayers })
});




// страница о сайте 
router.get('/about', (req, res) => {
  res.render('about')
});


module.exports = router;
