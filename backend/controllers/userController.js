const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { response } = require("express");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter a valid email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }
  const isPasswordChecked = await user.checkPassword(password);
  if (!isPasswordChecked) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }
  sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully!" });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User does not exist!", 404));
  }
  // Get reset password token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // Mailing
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/password/reset/${resetToken}`;
  const message = `Your password reset url is: \n\n ${resetPasswordUrl} \n\n If you did not requested this email, kindly ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password Link | BoomWear",
      message,
    });
    res.status(200).json({
      message: `Reset password email has been sent to ${user.email} successfully!`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Hashing Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expired!", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Confirm password does not match!", 400));
  }
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  await sendToken(user, 200, res);
});

// Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("favorites")
    .populate("orders.items.product");
  res.status(200).json({ user });
});

// Update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isPasswordChecked = await user.checkPassword(oldPassword);
  if (!isPasswordChecked) {
    return next(new ErrorHandler("Invalid old password!", 401));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Confirm password does not match!", 401));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // We will add cloudinary later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ user });
});

// Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find().populate("orders.items.product");
  res.status(200).json({ users });
});

// Get specific user details (admin only)
exports.getUserDetailsAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler("User does not exist with ID " + req.params.id, 400)
    );
  }
  res.status(200).json({ user });
});

// Update user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ user });
});

// Delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler("User does not exist with ID " + req.params.id, 400)
    );
  }
  user = await User.findByIdAndDelete(req.params.id);
  // We will remove cloudinary later
  res.status(200).json({ message: "User deleted successfully!" });
});

// Add product to favorites
exports.addToFavorites = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  user.favorites.push(req.body.id);
  await user.save();
  res
    .status(200)
    .json({ message: "Added to favorites!", favorites: user.favorites });
});
exports.removeFromFavorites = catchAsyncError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.user.id, {
    $pull: { favorites: req.body.id },
  });
  await user.save();
  res.status(200).json({ message: "Removed from favorites!" });
});
exports.getAllFavorites = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id).populate("favorites");
  res.status(200).json({ favorites: user.favorites });
});

exports.addToCart = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  const data = {
    product: req.body.id,
    size: req.body.size,
  };
  user.cart.push(data);
  await user.save();
  res.status(200).json({ message: "Added to cart!", cart: user.cart });
});

// Orders
// Create a new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  const { shipping, items, itemsPrice, shippingPrice, taxPrice, totalPrice, payment } =
    req.body.data;
  for (let i = 0; i < items.length; i++) {
    const product = await Product.findById(items[i]?.product);
    let index = product?.variants.findIndex((object) => {
      return object?.size === items[i]?.size;
    });
    product.variants[index].quantity -= items[i]?.quantity;
    await product.save();
  }
  user.orders.push({
    shipping,
    items,
    user: req.user.id,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    payment,
  });
  await user.save();
  res.status(200).json({ message: "Order Created!", user: user });
});

// Update user order status
exports.updateUserOrderStatus = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  if (req.body.status === "Delivered") {
    user = await User.updateOne(
      { "orders._id": req.body.id },
      {
        $set: {
          "orders.$.orderStatus": req.body.status,
          "orders.$.deliveredAt": Date.now(),
        },
      }
    );
  }
  user = await User.updateOne(
    { "orders._id": req.body.id },
    {
      $set: {
        "orders.$.orderStatus": req.body.status,
      },
    }
  );
  res.status(200).json({ user });
});

// Add review to the order and product
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  const { orderId, itemId, rating, comment, productId, size } = req.body;

  // const review = {
  //   rating: Number(rating),
  //   comment,
  //   customer: req.user.name,
  // };
  // const product = await Product.findById(productId);
  // if (!product) {
  //   return next(new ErrorHandler("Product not found!", 404));
  // }
  // product.reviews.push(review);
  // product.totalReviews = product.reviews.length;
  // // Average rating
  // let avg = 0;
  // product.reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });
  // product.ratings = avg / product.reviews.length;
  // await product.save({ validateBeforeSave: false });
  // Continue
  const itemData = {
    size,
    product: productId,
    rating,
    comment,
    isReviewed: true,
  };
  user = await User.updateOne(
    { "orders._id": orderId },
    {
      $pull: { "orders.$.items": { _id: itemId } },
    }
  );
  user = await User.updateOne(
    { "orders._id": orderId },
    {
      $push: { "orders.$.items": itemData },
    }
  );
  res.status(200).json({ user });
});
