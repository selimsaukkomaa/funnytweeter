console.log("😂😂😂");

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// Specifying the username and the count of tweets requested from the API.

var params = {
  screen_name: INSERT_USERNAME_HERE,
  count: INSERT_COUNT_HERE,
  exclude_replies: true
}

T.get('statuses/user_timeline', params, randomTweet);

// randomTweet is a function that does the initial randomization from the batch of tweets retrieved from the Twitter API.

function randomTweet(err, data, response) {

  var tweets = data;
  var funnytweet = tweets[Math.floor(Math.random()*tweets.length)].text + "  😂 😂 😂 ";
  validateTweet(funnytweet, tweets);

}

// validateTweet then takes what randomTweet has produced and runs it through a validation, checking if there are @ signs in the Tweet (since we don't want our bot pinging innocent bystanders all the time!). It then runs itself as many times needed to find a tweet that contains no @ signs and adds the emoji to that tweet.

function validateTweet(funnytweet, tweets) {
  if (funnytweet.includes("@")) {
    var funnytweet = tweets[Math.floor(Math.random()*tweets.length)].text + "  😂 😂 😂 ";
     console.log("tweet was discarded");
     validateTweet(funnytweet, tweets);
    } else {
     console.log("found a tweet: " + funnytweet);
    }

}

// Code for creating a test tweet.

  var testtweet = { status: "Testing " + " 😂 😂 😂 " }

// Code for posting to Twitter. Replace testtweet with funnytweet and the program will use a randomized tweet from the desired user's timeline.

  T.post('statuses/update', testtweet, function(err, data, response) {
    console.log(data)
  })

}
