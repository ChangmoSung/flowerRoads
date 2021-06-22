const mongoose = require("mongoose");

module.exports = MethodsOfPrevention = mongoose.model(
  "methodsOfPrevention",
  new mongoose.Schema({
    category: {
      type: String,
      required: true,
      unique: true,
    },
    methods: [
      {
        method: {
          type: String,
          required: true,
        },
        active: {
          type: Boolean,
          default: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
