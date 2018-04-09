require("dotenv").config();

//Packages and Modules
var fs =require('fs');
var keys = require('./keys.js');
//var client = new twitter(keys);
var Twitter = require('twitter');
var spotify = require('spotify');
var request =require('request');

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


/*var client = new Twitter({
    consumer_key: 'LqaijUaQLtCBfU7jsSX3XoRVN',
    consumer_secret: 'lcBjRbzj8PYaVgluycnoYD3kMzl7t5stjrLozsab9p2cFEJ8d6',
    access_token_key: '980959302197436422-UeJjG31CPHNWWYyB0YeV6O0aMFl5i7X',
    access_token_secret: 'ukhDy24IZ9Ne40OUFrH4GCTiMsBxLvMbxjtpkv7ZjlYI6'
    
  });*/
 /*  
function twitterData() {
    //User authentication credentials
    var client = new Twitter(keys.twitter);


    //Search parameters. Searches by userName
    //A maximum of 21 tweets can be returned
    var params = {
        screen_name: 'Foofa1313ejeme',
        count: 20
    };





    //Gets most recent tweets posted by the user indicated by the first parameter
    //Second parameter gets data from users screen name
    //Third parameter is a callback function, if credentials are valid then provide resonse else provide error
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        

        //If there is no error...
        if (!error) {
            console.log(tweets);
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
*/


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

function movieData(){
    if(process.argv.length >=4 || typeof userChoice === 'string')    
        
        request(' http://www.omdbapi.com/?i=tt3896198&apikey=6afda331'
        + userChoice +'&tomatoes=true',function(error, response, body){
           
            if (!error && response.statusCode === 200) {
                  
                  parsedData = JSON.parse(body);
                  displayMovie(parsedData);
              
            }
            else{
              throw error;
            }
        });
    else if(process.argv.length < 4){
        
        request('http://www.omdbapi.com/?i=tt3896198&apikey=6afda331'
            + 'Mr. Nobody' +'&tomatoes=true',function(error, response, body){
            
            if (!error && response.statusCode == 200) {
                  parsedData = JSON.parse(body);
                  displayMovie(parsedData);
              
            }
            else {
              throw error;
            }
        });
    }
}

function displayMovie(parsedData){

      movieTitle = parsedData['Title'];
      movieYear = parsedData['Year'];
      movieRating = parsedData['imdbRating'];
      movieCountry = parsedData['Country'];
      movieLang = parsedData['Language'];
      moviePlot = parsedData['Plot'];
      movieActor = parsedData['Actors'];
      tomatoRating = parsedData['tomatoRating'];
      tomatoURL = parsedData['tomatoURL'];
      //Movie info
      console.log('Movie Title: ' + movieTitle);
      console.log('Year: ' + movieYear);
      console.log('Imdb Rating: ' + movieRating);
      console.log('Country: ' + movieCountry);
      console.log('Language: ' + movieLang);
      console.log('Plot: ' + moviePlot);
      console.log('Actor: ' + movieActor);
      console.log('Rotton Tomatoes Rating: ' + tomatoRating);
      console.log('Rotton URL: ' + tomatoURL);

}
function readData(){



  fs.readFile('random.txt','utf8', function(err,data){
      if(err) throw err;

      var dataSplit = data.split(',');
          userInput = dataSplit[0];
          userChoice = dataSplit[1];

      switch(userInput){

          case "my-tweets":
            twitterData();
            break;

          case "spotify-this-song":
            spotifyData();
            break;
        
          case "movie-this":
            movieData();
            break;
      }

  });

}
/*Main
==============================================================*/

switch(userInput){
     
      case "do-what-it-says":
          readData();
          break;
      
      case "my-tweets":
          twitterData();
          break;
     
      case "spotify-this-song":
          spotifyData();
          break;
      
      case "movie-this":
          movieData();
          break;

      default:
          console.log('Error!!');
}