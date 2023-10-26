const mongoose = require("mongoose");
require("datejs");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required!"],
  },
  description: {
    type: String,
    required: [true, "Product Description is required!"],
  },
  usage: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Product Category required!"],
  },
  brand: String,
  quantity: { type: Number, required: true },
  variants: [
    {
      size: {
        type: String,
      },
      expiry: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      images: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      flavors: [
        {
          type: String,
        },
      ],
    },
  ],
  sale: Boolean,
  best: Boolean,
  shipping: {
    type: Number,
    default: 0,
  },
  related: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  reviews: [
    {
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
      },
      customer: {
        type: String,
      },
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.today().toString("yyyy-MM-dd"),
  },
});

module.exports = mongoose.model("Product", productSchema);
