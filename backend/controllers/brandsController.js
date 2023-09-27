const Brands = require("../models/brandsModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

// Create brands
exports.createBrands = catchAsyncError(async (req, res, next) => {
  const { title, image } = req.body;
  let photo;
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "brands",
  });
  photo = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  const brands = await Brands.create({
    title,
    image: photo,
  });
  res.status(200).json({ brands });
});

// Get all brands
exports.getAllBrands = catchAsyncError(async (req, res) => {
  const brands = await Brands.find();
  res.status(200).json({ brands });
});

// Delete brands
exports.deleteBrands = catchAsyncError(async (req, res, next) => {
  let brands = await Brands.findById(req.params.id);
  if (!brands) return next(new ErrorHandler("Brands not found!", 404));
  brands = await Brands.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Brands deleted successfully!" });
});
