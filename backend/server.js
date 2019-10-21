const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Acronyms = require('./models/Acronyms');

var myArgs = process.argv.slice(2);
const MONGO_USERNAME = myArgs[0];
const MONGO_PASSWORD = myArgs[1];
const MONGO_DB = myArgs[2];

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
// this is our MongoDB Acronymsbase
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-xrkyv.gcp.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});
var db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Acronyms.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateAcronyms', (req, res) => {
  const { id, update } = req.body;
  Acronyms.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteAcronyms', (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  console.log("Deleting data: " + id);
  Acronyms.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log("ERROR:" + err);
      return res.send(err);
    }
    console.log("deletion success");
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/addAcronym', (req, res) => {
  var { name, phrase, tags } = req.body;
  name = name.toUpperCase();
  phrase = toUpper(phrase);
  tags = tags.replace(/\s/g, '');
  const tagsArray = tags.split(",");

  console.log(name);
  console.log(phrase);
  console.log(tagsArray);

  Acronyms.findOne({acronym: name}, (err, acronym) => {
    if (err) {
      console.error("ERROR: " + err);
      return res.send(err);
    }

    if(!acronym) {
      console.log("doesnt exist");
      // create new entry
      var data = {
        acronym: name,
        phrases: [{ phrase: phrase, tags: tagsArray }]
      }
      Acronyms.create(data, function (err) {
        if (err) {
          console.log("ERROR: " + err)
          return res.send(err);
        }
        console.log("ADDED NEW ENTRY");
        return res.json({ success: true });
      });
    } else {
      console.log("exists: " + acronym);
      // update entry in database
      var newPhrase = { phrase: phrase, tags: tagsArray };
      Acronyms.findOneAndUpdate({acronym: name}, {$push: {phrases: newPhrase}}, (err) => {
        return err ? res.send(err) : res.json({ success: true });
      });
    }
  });
});

router.post('/getAcronyms', (req, res) => {
  const { text } = req.body;
  console.log(text);
  var jsonArray = JSON.parse(JSON.stringify(getAcronyms(text)));

  Promise.all(
    jsonArray.map(acronym => {
      return Acronyms.findOne({acronym: acronym}, (err, data) => {
        if (err) console.error("ERROR: " + err);
      });
    })
  )
  .then(acronyms => {
    acronyms.filter(function () { return true });
    acronyms = acronyms.filter(function (el) {return el != null;});
    acronyms = JSON.stringify(acronyms);
    console.log("acronyms = " + acronyms);
    return res.json(acronyms);
  }).catch(err => {
    return res.json({ success: false, error: err });
  });
});

function getAcronyms(str){
  var regex = /\b[A-Z](?=([&.]?))(?:\1[A-Z])+\b/g;
  var m;
  var list = [];
  while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          if(match == '' || match == '.' || match == "&");
          else list.push(match);
      });
  }
  console.log( unique = [...new Set(list)]);
  return unique;
}

function toUpper(str) {
  return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
}

router.post('/generateFreqGraph', (req, res) => {
  var {text, tags } = req.body;
  text = text;
  tags = tags.replace(/\s/g, '');
  var tagsArray = tags.split(",");
  var max = 0;
  var finalTag = null;
  console.log("we are in the generate method and here is the text:");
  var freqArray = generateFrequencies(text);
  tags.forEach(function (tag) {
    if(freqArray.includes(tag) && freqArray[tag] > max){
      max = freqArray[tag];
      finalTag = tag;
    }
  });
  return finalTag;
});

function generateFrequencies(str){
  var nogolist = ['','the','be','to','of','and','a','in','that','have','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we',
  'say','her','she','or','will','an','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','when','me','can','like',
  'time','no','just','him','know','take','into','your','some','could','them','see','other','than','then','now','look','only','come','its','over','think',
  'also','back','after','use','two','how','our','work','well','way','even','new','want','because','any','these','give','day','most','us','is','are'];
  var words = str.replace(/[^a-zA-Z ]/g, "").split(" ");
  var freqs = {};
  var freqs = {};
  words.forEach(function (item) {
    item = item.toLowerCase();
    if(!nogolist.includes(item)){
      if(freqs[item] == null)
        freqs[item] = 1;
      else
        freqs[item] += 1;
    }
  });
  console.log("freqArray:", freqs);
  return freqs;
}

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));