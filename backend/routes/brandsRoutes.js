const express = require("express");
const {
  createBrands,
  getAllBrands,
  deleteBrands,
} = require("../controllers/brandsController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

router.post(
  "/brands/create",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  createBrands
);
router.get("/brands", getAllBrands);
router.delete(
  "/brands/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteBrands
);

module.exports = router;
