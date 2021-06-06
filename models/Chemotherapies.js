const mongoose = require("mongoose");

module.exports = Chemotherapies = mongoose.model(
  "chemotherapies",
  new mongoose.Schema({
    user: {
      type: String,
    },
    chemotherapy: {
      type: String,
    },
    aboutChemotherapy: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
