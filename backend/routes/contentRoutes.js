const express = require("express");
const {
  getAllBanners,
  changeBanner,
  changeCaption,
} = require("../controllers/contentController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

router.put(
  "/content/banner/update",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  changeBanner
);

router.get("/content/banners", getAllBanners);

module.exports = router;
