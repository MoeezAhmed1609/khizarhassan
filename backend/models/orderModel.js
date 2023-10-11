const mongoose = require("mongoose");
require("datejs");
const orderSchema = mongoose.Schema({
  shipping: {
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    name: {
      type: String,
      required: [true, "Full name is required!"],
    },
    city: {
      type: String,
      required: [true, "City is required!"],
    },
  },
  items: [
    {
      size: {
        type: String,
        required: [true, "Size is required!"],
      },
      flavor: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
      rating: Number,
      comment: String,
    },
  ],
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  payment: {
    type: String,
    required: true,
  },
  deliveredAt: String,
  createdAt: { type: String, default: Date.today().toString("yyyy-MM-dd") },
});

module.exports = mongoose.model("Order", orderSchema);
