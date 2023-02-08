var express = require('express');
var cors = require('cors');
var querystring = require('querystring');
var cookieparser = require('cookie-parser');
var request = require('request');

var CLIENT_ID = "";
var CLIENT_SECRET = "";
var REDIRECT_URI = "";

var app = express();

app.get( "/playlist_id", (response, request) => {
    var authOptions = {
        url: 'https://api.spotify.com/v1/playlists/',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    };


})
