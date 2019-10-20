// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Phrase = new Schema({
  tags: [String]
});

// this will be our data base's data structure 
const Acronym = new Schema({
    name: { type: String, required: true },
    phrases: [Phrase]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Acronyms", Acronym);