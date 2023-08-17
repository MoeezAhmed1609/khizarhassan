const Banner = require("../models/bannerModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.changeBanner = catchAsyncError(async (req, res, next) => {
  let banner = await Banner.findById(req.body.id);
  banner.banner = req.body.banner;
  banner.caption = req.body.caption;
  await banner.save();
  res.status(200).json({ banner });
});

// Get all Banners
exports.getAllBanners = catchAsyncError(async (req, res) => {
  const banners = await Banner.find();
  res.status(200).json({ banners });
});
