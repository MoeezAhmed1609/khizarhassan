const mongoose = require("mongoose");
require("datejs");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title required!"],
    maxLength: [80, "Title cannot exceed 50 characters!"],
  },
  banner: {
    public_id: {
      type: String,
      required: [true, "Blog banner public id required!"],
    },
    url: { type: String, required: [true, "Blog banner url required!"] },
  },
  content: {
    type: String,
    required: [true, "Blog content required!"],
  },
  admin: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  comments: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
      comment: {
        type: String,
        maxLength: [400, "Comment cannot exceed 300 characters!"],
      },
    },
  ],
  actions: [
    {
      action: {
        type: String,
        enum: ["like", "dislike"],
      },
      user: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  createdAt: { type: String, default: Date.today().toString("yyyy-MM-dd") },
});

module.exports = mongoose.model("Blog", blogSchema);
