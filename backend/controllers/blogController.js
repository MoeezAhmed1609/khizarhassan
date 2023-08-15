const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

// Create Blog
exports.createBlog = catchAsyncError(async (req, res, next) => {
  const { title, image, content } = req.body;
  let banner;
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "blog",
  });
  banner = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  const blog = await Blog.create({
    title,
    banner,
    content,
    admin: req.user.id,
  });
  res.status(200).json({ blog });
});

// Get all blogs
exports.getAllBlogs = catchAsyncError(async (req, res) => {
  const blogs = await Blog.find().populate("admin");
  res.status(200).json({ blogs });
});

// Get blog by id
exports.getBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("admin");
  res.status(200).json({ blog });
});

// Upload blogs images
exports.uploadContentImages = catchAsyncError(async (req, res, next) => {
  let image;
  const result = await cloudinary.v2.uploader.upload(req.body, {
    folder: "content",
  });
  image = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  res.status(200).json({ image });
});
