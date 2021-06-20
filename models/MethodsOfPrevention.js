const mongoose = require("mongoose");

module.exports = MethodsOfPrevention = mongoose.model(
  "methodsOfPrevention",
  new mongoose.Schema({
    method: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
