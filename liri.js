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

