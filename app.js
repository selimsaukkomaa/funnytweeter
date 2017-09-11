console.log("Funnytweeter is starting...");

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

// Specifying the username and the count of tweets requested from the API.

var params = {
  screen_name: INSERT_USERNAME_HERE,
  count: INSERT_COUNT_HERE,
  exclude_replies: true
}


// randomTweet is a function that does the initial randomization from the batch of tweets retrieved from the Twitter API.


T.get('statuses/user_timeline', params, randomTweet);


function randomTweet(err, data, response) {

  var tweets = data;
  var funnytweet = tweets[Math.floor(Math.random()*tweets.length)].text + "  😂 😂 😂 ";
  validateTweet(funnytweet, tweets);

}

// validateTweet then takes what randomTweet has produced and runs it through a validation, checking if there are @ signs in the Tweet (since we don't want our bot pinging innocent bystanders all the time!). It then runs itself as many times needed to find a tweet that contains no @ signs and adds the emoji to that tweet. After it finds a tweet that does not contain @-symbols, it notifies the user of the tweet and posts it to Twitter using function T.post.


function validateTweet(funnytweet, tweets) {
  if (funnytweet.includes("@")) {
    var funnytweet = tweets[Math.floor(Math.random()*tweets.length)].text + "  😂 😂 😂 ";
     console.log("tweet was discarded");
     validateTweet(funnytweet, tweets);
    }
    else {
     console.log("found a tweet: " + funnytweet);
    T.post('statuses/update', { status: funnytweet } , callBack);

    }

}

// callBack is a function that is called by T.post when a suitable Twitter is found. callBack is used to verify from the Twitter APi that Tweet was actually sent and it will do so into the console.

  function callBack(err, data, response) {
    console.log("Posted to Twitter: " + data.text)
  }
