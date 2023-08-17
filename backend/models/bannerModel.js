const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "BoomWear Banner",
  },
  banner: { type: String, required: [true, "Banner url required!"] },
  caption: { type: String, required: [true, "Banner url required!"] },
});

module.exports = mongoose.model("Banner", bannerSchema);
