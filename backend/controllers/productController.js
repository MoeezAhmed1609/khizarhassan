const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/features");
const cloudinary = require("cloudinary");

// Create Product | Admin
exports.createProduct = catchAsyncError(async (req, res) => {
  const { name, description, price, discount, category, sizes } =
    req.body.product;
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const product = await Product.create({
    name,
    description,
    price,
    discount,
    category,
    sizes,
    images: imagesLinks,
    admin: req.user.id,
  });
  res.status(200).json({ message: "Product created successfully!", product });
});

// Get All products | Admin / Users
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productsPerPage = 16;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productsPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ products, productsCount });
});

// Update Product | Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  const { name, description, price, discount, category, sizes, oldImages } =
    req.body.product;
  let images = [];
  if (req.body.images.length > 0) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      oldImages?.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      discount,
      category,
      sizes,
      images: oldImages,
      admin: req.user.id,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
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
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({ product });
});

// Create and Update Product Reviews
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    rating: Number(rating),
    comment,
    customer: req.user.name,
    customerId: req.user.id,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  const isReviewed = product.reviews.find(
    (rev) => rev.customerId.toString() === req.user.id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.customerId.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
  }
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
  const reviews = product.reviews.filter((rev) => {
    rev._id.toString() !== req.body.id.toString();
  });
  // Average rating
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = Number(avg / reviews.length);
  const totalReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.body.productId,
    {
      reviews,
      ratings,
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
