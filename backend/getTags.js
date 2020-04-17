const mongoose = require('mongoose');
const Acronyms = require('./models/Acronyms');
const fetch = require("node-fetch");
var throttledQueue = require('throttled-queue');

var throttle = throttledQueue(2, 1000);

var myArgs = process.argv.slice(2);
const MONGO_USERNAME = myArgs[0];
const MONGO_PASSWORD = myArgs[1];
const MONGO_DB = myArgs[2];

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-xrkyv.gcp.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});
var db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


Acronyms.find((err, data) => {
  if (err) console.log(err);
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    for(var j = 0; j < data[i].phrases.length; j++) {
      var strings = data[i].phrases[j].phrase.split(" ");
      // console.log(strings)
      var name = data[i].acronym;
      // console.log(name)
      throttle(function() {
        // perform some type of activity in here.
        Acronyms.findOneAndUpdate({acronym: name}, {$set: {tags: strings}}, (err) => {
          err ? console.log(err) : console.log("Added "+strings+" to: " + name);
        });
      });
    }
  }
  return
});