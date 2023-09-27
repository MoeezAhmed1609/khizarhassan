const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

router.post(
  "/category/create",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  createCategory
);
router.get("/categories", getAllCategories);
router.delete(
  "/category/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteCategory
);

module.exports = router;
