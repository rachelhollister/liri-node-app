//use dotenv package to read and set any environment variable. Console log a test
require("dotenv").config();
console.log("Hello I am Liri, Siri's much more popular cousin!")

//add code required to import 'keys.js' file and store in a var. 
//acccess keys information using spotify key
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

//request and input arg
var request = process.argv[2];
var input = process.argv[3];

//search for a specific artist or band in town and render the information to terminal
//include name of venue, venue location, and date of event MM/DD/YYYY
//if the input is undefined add in a filler artist
function townArtists(){

var artist = "";
bandPlaying = process.argv;
if(input===undefined){
  artist = "Santana" 
} else {
  for(i=3; i<bandPlaying.length; i++){
    artist += bandPlaying[i];
  }
}

//use the provided link in README.md for bandsintown
//axios request using Bands in Town API
axios.get("https://rest.bandsintown.com/artists/" + artist +"/events?app_id=codingbootcamp").then(
  function(response) {
  quick = response.data[0];
    console.log("Name of Venue: "+quick.venue.name);
    console.log("Venue Location: "+quick.venue.city);
    console.log(moment(quick.datetime).format('MM-DD-YY'));

    }
  );
}
 
//search for a specific song from the spotify in terminal, include artist, song name, preview, and the album
//if no song is provided then default to "The Sign" by Ace of Base in the input
//use spotify API and sign up as developer, use the client-id and client-secret
//this goes in my .env file

function spotifyThisSong(){
    var songArg = process.argv;
    input = input+"+";
    if(input===undefined){
      artist = "The Sign"
    } else {
      for(var i=4; i < songArg.length; i++){
        input += songArg[i]+"+";
      }
    } 

    spotify.search({ type: 'track', query: input, limit:1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(input);
      var quick = data.tracks.items;
      console.log("Artist: "+quick[0].artists[0].name)
      console.log("Song Name: "+quick[0].name);
      console.log("Check out a Preview: "+JSON.stringify(quick[0].external_urls));
      console.log("Album: "+quick[0].album.name); 
      }
      );
    }
    
    //take in the title of movie, release year, rating, rotten tomatoes rating,
    //country produced, language, plot, and actors
    //Grab data from omdb 
    function moviethis(){
    var movieName = '';
    var theArg = process.argv;
    
    if(input===undefined){
    // if no movie name is entered
      movieName = 'Mr.'+"+"+"Nobody";  
    }  else {
    // otherwise this captures movie names with 1 or more words
      for(i=3; i<theArg.length; i++){
          movieName += theArg[i]+"+";
      }
      
    }
    
    //run axios using OMDB API
    var url = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy";
    axios.get(url)
    .then(
    function(response) { 
        console.log("Title: "+response.data.Title);
        console.log("Release Year: "+response.data.Year);
        console.log("IMDB Rating: "+response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: "+response.data.Ratings[0].Value);
        console.log("Country Produced: "+response.data.Country);
        console.log("Language: "+response.data.Language);
        console.log("Plot: "+response.data.Plot);
        console.log("Actors :"+response.data.Actors);
        }
      );
    }
    
    // using fs node will take the text inside random.txt and use it to call the do-what-it-says command
    //recall that this is what I placed in the random.txt file - spotify-this-song,"I Want it That Way"
    function says(){
    
      fs.readFile("random.txt", "utf8", function(error,data){
        if(error){
          return console.log(error);
        }
        var theCommand = data.split(',');
        request = theCommand[0];
        input = theCommand[1];
    
        commandCheck();
    
      });
    }
    
    function commandCheck(){
    if(request == "spotify-this-song"){
      spotifyThisSong();
    }else if(request === 'movie-this'){
      moviethis();
    } else if(request === 'concert-this'){
      townArtists();
    }else if (request === 'do-what-it-says'){
      says();
    } else {
      console.log("Liri does not understand, please try a new command.");
    }
    
    }
    
    commandCheck();
    
    
