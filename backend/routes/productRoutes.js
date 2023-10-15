const express = require("express");
// Controller
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteProductReview,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

// Routes
router.get("/products", getAllProducts);
router.post(
  "/products/create",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  createProduct
);
router.put(
  "/products/update/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateProduct
);
router.delete(
  "/products/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteProduct
);
router.get("/products/:id", getProductDetails);
router.put("/product/review", createProductReview);
router.get("/product/reviews/:id", getAllProductReviews);
router.delete(
  "/product/review/delete",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteProductReview
);

module.exports = router;
