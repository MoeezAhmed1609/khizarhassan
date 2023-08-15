const express = require("express");
const {
  uploadBanner,
  getAllBanners,
} = require("../controllers/contentController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

router.post(
  "/content/banner/add",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  uploadBanner
);

router.get("/content/banners", getAllBanners);

module.exports = router;
