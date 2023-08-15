const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User's name required!"],
    maxLength: [30, "Username cannot exceed 30 characters"],
    minLength: [3, "Username must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email required!"],
    unique: true,
    validate: [validator.isEmail, "Invalid email!"],
  },
  password: {
    type: String,
    required: [true, "Password required!"],
    minLength: [8, "Password must contain at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  orders: [
    {
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
          isReviewed: {
            type: Boolean,
            default: false,
          },
          rating: Number,
          comment: String,
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
    },
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hashing password with bcryptjs
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token Authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Check Password
userSchema.methods.checkPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = async function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing & adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
