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
// var data = {
//   name: 'BAILEY',
//   phrases: [
//     {
//       phrase: "BAILEY IS THE BEST",
//       tags: [
//         "Bailey",
//         "Waldorf",
//         "Grant"
//       ]
//     },
//     {
//       phrase: "BAILEY IS THE WORST",
//       tags: [
//         "Bailey",
//         "Grant",
//         "Waldorf"
//       ]
//     }
//   ]
// }
// Acronyms.create(data, function (err) {
//   if (err) return handleError(err);
// });

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
router.post('/putAcronyms', (req, res) => {
  let data = new Acronyms();
  const { id, message } = req.body;
  console.log("Adding new data: " + message + "at index" + id);

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/getAcronyms', (req, res) => {
  const { text } = req.query;

  var jsonArray = JSON.parse(JSON.stringify(getAcronyms(text)));
  // console.info("Found acronyms: " + jsonArray);
  console.log(jsonArray.length);
  var array = [];
  for(var i = 0; i < jsonArray.length; i++) {
    Acronyms.find({acronym: jsonArray[i]}, (err, data) => {
      if (err) console.error("ERROR: " + err);
      if (data.length > 0) {
        console.log(data[0].acronym.toString());
        array.push(data[0].acronym.toString());
        // console.log("DATA: " + data);
      }
    });
  }
  console.log("ARRAY = " + array.length);

  return res.json(array);
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

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));