const express = require('express');
const axios = require('axios');
var request = require('request');

const app = express();

var CLIENT_ID = "c23486dfd16347c8acc94676e5010729";
var CLIENT_SECRET = "413b7493c42c41638fb9dff162c854e4";
const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
let accessToken = "";

const playlistId = "3t8vvCtggMRMk6R4vPJj9S";
const SPOTIFY_API_URL = `https://api.spotify.com/v1/playlists/${playlistId}`;

const options = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Authorization": `Basic ${auth}`
    },
    form: {
      grant_type: "client_credentials" // grant flow set 
    },
    json: true
};

request.post(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      accessToken = body.access_token;
      console.log(`Access Token: ${accessToken}`);
    }
});

app.get('/', (req, res) => {
    res.send("Add /songs after 4000 to display song names for Playlist ID: " + playlistId);
});


// We can use this to redirect directly to '/songs' instead of the index page. Comment-out above code to use
// app.get('/', (req, res) => {
//     res.redirect('/songs');
// });

app.get('/songs', (req, res) => {
    axios.get(SPOTIFY_API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      // https://developer.spotify.com/console/get-playlist/?playlist_id=3t8vvCtggMRMk6R4vPJj9S&market=&fields=&additional_types=  
      const songs = response.data.tracks.items.map(item => item.track.name); // try track.popularity
      console.log(songs);
      res.send({ songs });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while fetching the songs' });
    });
});
  
app.listen(4000, () => {
    console.log('App listening on port 4000!');
});