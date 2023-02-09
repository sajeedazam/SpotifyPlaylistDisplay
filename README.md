## TransferMusic

# 2023-02-07
- Able to retireve song names from a given playlist ID. 
- Using Client ID and Client Secretkey from our Spotify Developer Account to get the Access Token (i.e., client credential grant flow).
- Prints a json of the retrieved song names on localhost:{port}/songs.

# 2023-02-08
- Added Text bar to paste playlist link.
- Uses regex expression to retrieve the Playlist ID from the URL.
- Made use of the 'body-parser' package to retrive the submited text from the form.