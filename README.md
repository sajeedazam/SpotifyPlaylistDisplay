## TransferMusic




## UPDATES

# 2023-02-05
- Project init.

# 2023-02-06
- Downloaded dependencies. 

# 2023-02-07
- Able to retireve song names from a given playlist ID. 
- Using Client ID and Client Secretkey from our Spotify Developer Account to get the Access Token (i.e., client credential grant flow).
- Prints a json of the retrieved song names on localhost:{port}/songs.

# 2023-02-08
- Added Text bar to paste playlist link.
- Uses regex expression to retrieve the Playlist ID from the URL.
- Made use of the 'body-parser' package to retrive the submited text from the form.

# 2023-02-09
- Removed the use of 'request' package.
- Parsed Artist names from Spotify's GET playlist json.
- Concatenated song names with artist names.
- Installed ejs for views.
- Outputs a table of songs with artist names from a template using ejs.

# 2023-02-11
- Cleaned up packages and dependencies.
- Added a .gitignore file.
- Used dotenv files to hide sensitive data.
- Used nodemon package.