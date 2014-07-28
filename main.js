var vendors = require('./vendors'),
  config = require('./conf/config'),
  Ntwitter = require('ntwitter');

var twitter = new Ntwitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token,
  access_token_secret: config.twitter_token_secret
});


vendors.mongopubsub.subscribe('events', function (event) {
  console.log(event);
  var message = 'Server ' + event.hostname + ' ' + event.level + ' with ' + event.value + ' ' + event.sensor;
  twitter.updateStatus(message, function (err, data) {
    if(err) return console.log(err);
      console.log(data);
  });
});


/*
vendors.mongopubsub.subscribe('messages', function (message) {
  console.log(message);
});
*/
