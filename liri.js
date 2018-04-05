require("dotenv").config();

//Packages and Modules
var keys = require('./keys');
var twitter = require('twitter');
//var spotify = require('spotify');
var request =require('request');
var fs =require('fs');
//User input
var userInput = process.argv[2];
var userChoice = process.argv[3];

//Movie Info
var movieTitle;
var movieYear;
var movieRating;
var movieCountry;
var movieLang;
var moviePlot;
var movieActor;
var tomatoRating;
var tomatoURL;

var parsedData;

/*Functions
==============================================================*/

function twitter(inputs) {
    //User authentication credentials
    var client = new twitter;

    //Search parameters. Searches by userName
    //A maximum of 21 tweets can be returned
    var params = {
        screen_name: 'ejeme',
        count: 20
    };





    //Gets most recent tweets posted by the user indicated by the first parameter
    //Second parameter gets data from users screen name
    //Third parameter is a callback function, if credentials are valid then provide resonse else provide error
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        

        //If there is no error...
        if (!error) {
            //console.log("something went wrong");
            for (var i = 0; i<tweets.length; i++) {
                console.log("Created at: "+ tweets[i].created_at);
                console.log("Text: " + tweets[i].text);
                console.log('-------------------------------');
            }
        }

        else {
            //console.log("it worked");
        }
        






        });





} 

/*
function spotifyData(){
    //If the user inputs a song....
    if(process.argv.length >=4 || typeof userChoice === 'string') {
          //Display spotify song
          spotify.search({type:'track', query: userChoice}, function(err, data){
                
                if(!err) {
                  displaySpotify(data);
                }
             
                else {
                  throw err;
                }
          });
    }
    //If user doesn't input a song....
    else if(process.argv.length < 4) {
          //Displays default song data
          spotify.search({type:'track', query: "The Sign Ace of Base" }, function(err, data){
              //if there is no error then...
              if(!err) {
                //Display spotify data to terminal
                displaySpotify(data);
              }
           
              else {
                throw err;
              }
        });
    }
}

function displaySpotify(data){
  var artists = data['tracks']['items'][1]['artists'][0]['name'];
  var album = data['tracks']['items'][1]['album']['name'];
  var songPreview = data['tracks']['items'][1]['external_urls']['spotify'];
  var track = data['tracks']['items'][1]['name'];
  //Testing
  // console.log(JSON.stringify(data['tracks']['items'][1]['name'] ,null, 1));
  console.log('Artist: ' + artists);
  console.log('Track: ' + track);
  console.log('Album ' + album);
  console.log('Song Preview: ' + songPreview);
}
*/