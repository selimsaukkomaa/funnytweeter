console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);



var params = {
  screen_name: 'oskarionninen',
  count: 10,
}

T.get('statuses/user_timeline', params, randomTweet);

// Creating the random tweet from the group of tweets requested from the API.

function randomTweet(err, data, response) {

  var tweets = data;
  var funnytweet = tweets[Math.floor(Math.random()*tweets.length)].text + " 😂"

// Code for creating a test tweet.

  var testtweet = { status: "Testing " + "😂" }

// Code for posting to Twitter. Replace testtweet with funnytweet and the program will use a randomized tweet from the desired user's timeline.

  T.post('statuses/update', testtweet, function(err, data, response) {
    console.log(data)
  })

}
