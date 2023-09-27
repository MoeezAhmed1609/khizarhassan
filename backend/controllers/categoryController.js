const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

// Create Category
exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { title, image } = req.body;
  let photo;
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "category",
  });
  photo = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  const category = await Category.create({
    title,
    image: photo,
  });
  res.status(200).json({ category });
});

// Get all categories
exports.getAllCategories = catchAsyncError(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// Delete Category
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) return next(new ErrorHandler("Category not found!", 404));
  category = await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category deleted successfully!" });
});
