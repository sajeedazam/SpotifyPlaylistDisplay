const express = require('express');
const axios = require('axios');

const app = express();
const SPOTIFY_API_URL = 'https://api.spotify.com/v1/playlists/3t8vvCtggMRMk6R4vPJj9S';
const ACCESS_TOKEN = 'BQB72kl3iKSqq1WcpNhjRWe9dne0tQTlojtLXmQREyCLViiTqzmYSVUQuLYpok7oeFhzKvSEkiaYRoZLMZKIKVLZIcTiauXKKeHrArNP_VSb54E_4sbYsNV44rTLfHlTOHi4edc5JZWCtsfvA6SVLoXaqVZ8VQbRF6notcC-G_u6ep9KJomrucJ4YJN7sj9OUW7yWNavEtDRWA';

app.get('/', (req, res) => {
    res.redirect('/songs');
});


app.get('/songs', (req, res) => {
    axios.get(SPOTIFY_API_URL, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    })
    .then(response => {
      const songs = response.data.tracks.items.map(item => item.track.name);
  
      console.log(songs);
      res.send({ songs });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while fetching the songs' });
    });
  });
  
  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });