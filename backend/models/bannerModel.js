const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  xs: {
    type: String,
    required: true,
  },
  sm: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
