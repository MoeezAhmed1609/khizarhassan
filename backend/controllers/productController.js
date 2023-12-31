const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/features");
const cloudinary = require("cloudinary");
const generateSitemap = require("../utils/generate-sitemap.js")

// Create Product | Admin
exports.createProduct = catchAsyncError(async (req, res) => {
  const {
    name,
    description,
    usage,
    category,
    quantity,
    variants,
    related,
    sale,
    best,
    brand,
    shipping,
  } = req.body.product;
  const product = await Product.create({
    name,
    description,
    usage,
    category,
    quantity,
    variants,
    related,
    sale,
    best,
    shipping,
    brand,
    admin: req.user.id,
  }).then(() => {
    generateSitemap();
  });
  res.status(200).json({ message: "Product created successfully!", product });
});

// Get All products | Admin / Users
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productsCount = await Product.countDocuments();
  const products = await Product.find();
  res.status(200).json({ products, productsCount });
});

// Update Product | Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  const {
    name,
    description,
    usage,
    category,
    quantity,
    variants,
    related,
    sale,
    best,
    brand,
    shipping,
  } = req.body.product;
  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      usage,
      category,
      quantity,
      variants,
      related,
      sale,
      best,
      brand,
      admin: req.user.id,
      shipping,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ message: "Product updated successfully!", product });
});

// Delete Product | Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted successfully!" });
});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id).populate("related");
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({ product });
});

// Create and Update Product Reviews
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, customer, image, id } = req.body.review;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  let asset;
  if (image) {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "reviews",
    });
    asset = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  const review = {
    rating: Number(rating),
    comment,
    customer,
    image: asset,
  };
  product.reviews.push(review);
  // Average rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "Product review created successfully",
  });
});

// Get all product reviews | Admin
exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  res.status(200).json({ reviews: product.reviews });
});

// Delete product review | Admin
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  if (!req.body.id || !req.body.productId)
    return next(new ErrorHandler("Invalid Data!", 404));
  let product = await Product.findById(req.body.productId);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.body.id.toString()
  );
  // Average rating
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const totalReviews = reviews?.length;
  const ratings = Number(avg / totalReviews);
  await Product.findByIdAndUpdate(
    req.body.productId,
    {
      reviews,
      ratings: ratings > 0 ? ratings : 0,
      totalReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ message: "Product review deleted successfully!" });
});
