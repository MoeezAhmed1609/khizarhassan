const Banner = require("../models/bannerModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

exports.uploadBanner = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "banners",
  });
  const banner = await Banner.create({
    banner: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  res.status(200).json({ banner });
});

// Get all Banners
exports.getAllBanners = catchAsyncError(async (req, res) => {
  const banners = await Banner.find();
  res.status(200).json({ banners });
});
