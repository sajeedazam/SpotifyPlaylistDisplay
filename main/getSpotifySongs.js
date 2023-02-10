const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

var CLIENT_ID = "c23486dfd16347c8acc94676e5010729";
var CLIENT_SECRET = "413b7493c42c41638fb9dff162c854e4";

let accessToken = "";
let playlistLink = "";
let playlistId = "";

app.get('/', (req, res) => {
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    const auth = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const options = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Authorization": `Basic ${auth}`
      },
      formData: qs.stringify({
        grant_type: "client_credentials"
      })
    };

    axios.post(options.url, options.formData, { headers: options.headers })
    .then(response => {
        accessToken = response.data.access_token;
    })
    .catch(error => {
        console.error(error);
        res.send(error);
    });
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
      const artists = response.data.tracks.items.map(item => item.track.artists[0].name);
      let songsWithArtists = [];
      for (let index = 0; index < songs.length; index++) {
        songsWithArtists[index] = songs[index] + " - " + artists[index];

      }
      res.render('songs', { songs: songsWithArtists });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while fetching the songs' });
    });
});
  
app.listen(4000, () => {
    console.log('App listening on port 4000!');
});