const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetailsAdmin,
  updateUserRole,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  addToCart,
  createOrder,
  updateUserOrderStatus,
  createProductReview,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.post("/user/forgot/password", forgotPassword);
router.put("/user/password/reset/:token", resetPassword);
router.put("/user/password/update", isAuthenticatedUser, updatePassword);
router.get("/user/profile", isAuthenticatedUser, getUserDetails);
router.put("/user/profile/update", isAuthenticatedUser, updateProfile);
router.put("/user/favorite/new", isAuthenticatedUser, addToFavorites);
router.delete(
  "/user/favorite/remove",
  isAuthenticatedUser,
  removeFromFavorites
);
router.get("/user/favorite", isAuthenticatedUser, getAllFavorites);
router.put("/user/cart/new", isAuthenticatedUser, addToCart);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getAllUsers
);
router.get(
  "/admin/users/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getUserDetailsAdmin
);
router.put(
  "/admin/users/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateUserRole
);
router.delete(
  "/admin/users/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteUser
);
// Order
router.put("/user/orders/new", createOrder);
router.put(
  "/user/orders/status",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateUserOrderStatus
);
router.put("/user/orders/review", isAuthenticatedUser, createProductReview);

module.exports = router;
