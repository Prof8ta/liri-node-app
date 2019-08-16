require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const moment = require("moment");

let command = process.argv[2];
let input = process.argv.slice(3).join(" ");

switch (command) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
};

function concertThis() {
    
    if (input === "") {
      input = "Backstreet Boys";
    };
  
    axios
      .get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
      .then(function(response) {
        const concertsArr = response.data;
  
       
        concertsArr.forEach(concert => {
          
          let convertedDate = moment(concert.datetime).format("MM/DD/YYYY");
  
         
          console.log(`Venue: ${concert.venue.name}
  Location: ${concert.venue.city}
  Date: ${convertedDate}
          
  `);
  
          
          fs.appendFile("log.txt", `Venue: ${concert.venue.name}
  Location: ${concert.venue.city}
  Date: ${convertedDate}
                  
  `, function(error) {
            if (error) {
              console.log(error);
            };
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  
  function spotifyThis() {
   
    if (input === "") {
      input = "The Sign Ace of Base"
    };
    
    spotify
      .search({
         type: 'track', 
         query: input
      })
      .then(function(response) {
        const tracksArr = response.tracks.items;
  
        tracksArr.forEach(song => {
          
          console.log(`Artist(s): ${song.artists[0].name}
  Song Name: ${song.name}
  Preview Song: ${song.preview_url}
  Album: ${song.album.name}
        
  `);
  
          
          fs.appendFile("log.txt", `Artist(s): ${song.artists[0].name}
  Song Name: ${song.name}
  Preview Song: ${song.preview_url}
  Album: ${song.album.name}
              
  `, function(error) {
            if (error) {
              console.log(error);
            };
          });
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  
  
  function movieThis() {
    
    if (input === "") {
      input = "Mr. Nobody"
    };
  
    axios
      .get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
      .then(function(response) {
  
        let movieData = response.data
  
        
        console.log(`Title: ${movieData.Title}
  Release Year: ${movieData.Year}
  IMDB Rating: ${movieData.imdbRating}
  Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
  Country: ${movieData.Country}
  Language: ${movieData.Language}
  Plot: ${movieData.Plot}
  Actors: ${movieData.Actors}
  `);
  
   
        fs.appendFile("log.txt", `Title: ${movieData.Title}
  Release Year: ${movieData.Year}
  IMDB Rating: ${movieData.imdbRating}
  Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
  Country: ${movieData.Country}
  Language: ${movieData.Language}
  Plot: ${movieData.Plot}
  Actors: ${movieData.Actors}
  `, function(error) {
          if (error) {
            console.log(error);
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  
  function doWhatItSays() {
  
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        console.log(error);
      };
  
      
      let dataArr = data.split(",");
      
     
      command = dataArr[0];
      input = dataArr[1];
  
     
      switch (command) {
        case "concert-this":
          concertThis();
          break;
        case "spotify-this-song":
          spotifyThis();
          break;
        case "movie-this":
          movieThis();
          break;
      };
    });
  };