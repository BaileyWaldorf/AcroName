const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Acronyms = require('./models/Acronyms');
var sw = require('stopword');


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

mongoose.connect(url, {
    useNewUrlParser: true
});
var db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database

Acronyms.find((err, data) => {
    console.log("Starting...");
    if (err) {
        console.log("uhoh");
    }
    console.log("Building list...");
    var tags;

    var i;
    var k;
    for (i = 0; i < 1; i++) {
        for (k = 0; k < 1; k++) {
            console.log(sw.removeStopwords(data[i].phrases[k].phrase.split(' ')));
            data[i].phrases[k].tags;
            var syms = sw.removeStopwords(data[i].phrases[k].phrase.split(' '));
            var m;
            for (m = 0; m < syms.length; m++) {
                axios.get(`https://tuna.thesaurus.com/relatedWords/${syms[m]}?limit=1`).then(response => {
                        console.log((response.data.data[0].synonyms[0]));
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

        // var array = data[i].phrases[0];
        // console.log(array);
    }
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));