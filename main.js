var mongoClient = require('mongodb').MongoClient,
  mubsub = require('mubsub'),
  config = require('./conf/config'),
  Ntwitter = require('ntwitter');

var twitter = new Ntwitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token,
  access_token_secret: config.twitter_token_secret
});


mongoClient.connect('mongodb://' + config.mongo_host + ':' + config.mongo_port + '/' + config.mongo_database, function(err, conn) {
  if(err){
    console.log(err.message);
    throw new Error(err);
  } else {
    db = conn;
    var channel = mubsub(db).channel('pubsub');
    channel.on('error', console.error);
    main(channel);
  }
});


function main(mongopubsub) {
  mongopubsub.subscribe('events', function (event) {
    console.log(event);
    var message = 'Server ' + event.hostname + ' ' + event.level + ' with ' + event.value + ' ' + event.sensor;
    twitter.updateStatus(message, function (err, data) {
      if(err) return console.log(err);
    });
  });


  /*
  mongopubsub.subscribe('messages', function (message) {
    console.log(message);
  });
  */
}
