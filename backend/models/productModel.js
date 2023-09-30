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
        required: true,
      },
      quantity: {
        type: Number,
        required: [true, "Product Quantity is required!"],
      },
      price: {
        type: Number,
        required: [true, "Product Price is required!"],
      },
      discount: {
        type: Number,
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
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
