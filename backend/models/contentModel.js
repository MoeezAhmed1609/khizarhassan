const mongoose = require("mongoose");
require("datejs");
const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: { type: String, default: Date.today().toString("yyyy-MM-dd") },
});

module.exports = mongoose.model("Content", contentSchema);
