// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const Acronym = new Schema(
  {
    id: Number,
    acronym: String,
    phrase: String,
    tags: []
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", Acronym);