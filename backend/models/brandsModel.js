const mongoose = require("mongoose");
const brandsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Brands Title is required!"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Brands", brandsSchema);
