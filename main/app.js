var express = require('express');
const axios = require('axios');
var cors = require('cors');
var querystring = require('querystring');
// var fetch = require('fetch');
// var cookieparser = require('cookie-parser');
var request = require('request');

var CLIENT_ID = "c23486dfd16347c8acc94676e5010729";
var CLIENT_SECRET = "413b7493c42c41638fb9dff162c854e4";

var app = express();

const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
// const accessToken = "";


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
      const accessToken = body.access_token;
      console.log(`Access Token: ${accessToken}`);
    //"https://api.spotify.com/v1/playlists/3t8vvCtggMRMk6R4vPJj9S/tracks"
    }
});

// const options2 = {
//             url: "https://api.spotify.com/v1/playlists/3t8vvCtggMRMk6R4vPJj9S/tracks",
//             headers: {
//             "Authorization": `Bearer ${accessToken}`
//             },
//             json: true
//         };

//         request.get(options, (error, response, body) => {
//             if (error) {
//             console.error(error);
//             } else {
//             const playlistId = body.error;
//             console.log(`Playlist ID: ${playlistId}`);
//             }
//         });