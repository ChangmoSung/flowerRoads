const mongoose = require("mongoose");

module.exports = UserData = mongoose.model(
  "userData",
  new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    foods: [
      {
        food: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    sideEffects: [
      {
        sideEffect: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
