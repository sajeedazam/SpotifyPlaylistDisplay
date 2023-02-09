const express = require('express');
const axios = require('axios');
var request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var CLIENT_ID = "c23486dfd16347c8acc94676e5010729";
var CLIENT_SECRET = "413b7493c42c41638fb9dff162c854e4";
const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

let accessToken = "";
let playlistLink = "";
let playlistId = "";

const options = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Authorization": `Basic ${auth}`
    },
    form: {
      grant_type: "client_credentials"
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
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    const form = '<form action="/songs" method="POST">' +
                    '<input type="text" name="playlistLink" placeholder="Paste" />' +
                    '<button type="submit">Submit</button>' +
                 '</form>';
    res.send(form);
});

app.post('/songs', (req, res) => {
    playlistLink = req.body.playlistLink;
    if (!playlistLink) {
        return res.status(400).send('Playlist Link is required');
    }
    const result = playlistLink.match(/playlist\/([^?]+)/);
    playlistId = result[1];
    const SPOTIFY_API_URL = `https://api.spotify.com/v1/playlists/${playlistId}`;
    axios.get(SPOTIFY_API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      // https://developer.spotify.com/console/get-playlist/?playlist_id=3t8vvCtggMRMk6R4vPJj9S&market=&fields=&additional_types=  
      const songs = response.data.tracks.items.map(item => item.track.name);
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