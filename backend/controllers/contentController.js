const Banner = require("../models/bannerModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");
const Content = require("../models/contentModel");

exports.changeBanner = catchAsyncError(async (req, res, next) => {
  const { xs, sm } = req.body.banner;
  let imageXs;
  let imageSm;
  const resultXs = await cloudinary.v2.uploader.upload(xs, {
    folder: "banners",
  });
  imageXs = {
    url: resultXs.secure_url,
  };
  const resultSm = await cloudinary.v2.uploader.upload(sm, {
    folder: "banners",
  });
  imageSm = {
    url: resultSm.secure_url,
  };
  const banner = await Banner.create({ xs: imageXs, sm: imageSm });
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

exports.createContent = catchAsyncError(async (req, res, next) => {
  const { title, content } = req.body.contents;
  const contents = await Content.create({ title, content });
  res.status(200).json({ contents });
});

exports.getAllContents = catchAsyncError(async (req, res) => {
  const contents = await Content.find();
  res.status(200).json({ contents });
});

exports.updateContent = catchAsyncError(async (req, res, next) => {
  const { title, content } = req.body.contents;
  let cont = await Content.findOne({ title });
  if (!cont) return next(new ErrorHandler("Content not found!", 404));
  cont = await Content.findOneAndUpdate(
    { title },
    {
      title,
      content,
    }
  );
  res.status(200).json({ contents: cont, message: "Updated!" });
});
