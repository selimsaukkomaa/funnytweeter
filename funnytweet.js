console.log("😂😂😂");

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// Specifying the username and the count of tweets requested from the API.

var params = {
  screen_name: INSERT_USERNAME_HERE,
  count: INSERT_COUNT_HERE,
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
