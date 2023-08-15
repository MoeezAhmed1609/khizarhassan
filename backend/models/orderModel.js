const mongoose = require("mongoose");
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
    zip: {
      type: String,
      required: [true, "Zip is required!"],
    },
  },
  items: [
    {
      size: {
        type: String,
        required: [true, "Size is required!"],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
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
  taxPrice: {
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
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
