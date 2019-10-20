// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Phrase = new Schema({
  phrase: String,
  tags: [String]
});

// this will be our data base's data structure 
const Acronym = new Schema({
  acronym: { type: String, required: true },
  phrases: [Phrase]
}, { collection: 'Acronyms' });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Acronyms", Acronym);