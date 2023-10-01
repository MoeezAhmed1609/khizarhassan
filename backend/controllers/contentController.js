const Banner = require("../models/bannerModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

exports.changeBanner = catchAsyncError(async (req, res, next) => {
  let image;
  const result = await cloudinary.v2.uploader.upload(req.body.banner, {
    folder: "banners",
  });
  image = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  const banner = await Banner.create({ banner: image });
  res.status(200).json({ banner });
});

// Get all Banners
exports.getAllBanners = catchAsyncError(async (req, res) => {
  const banners = await Banner.find();
  res.status(200).json({ banners });
});

// Delete Banner
exports.deleteBanner = catchAsyncError(async (req, res, next) => {
  let banner = await Banner.findById(req.params.id);
  if (!banner) return next(new ErrorHandler("Banner not found!", 404));
  banner = await Banner.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Banner deleted successfully!" });
});
