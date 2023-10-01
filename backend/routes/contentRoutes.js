const express = require("express");
const {
  getAllBanners,
  changeBanner,
  changeCaption,
  deleteBanner,
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
router.delete(
  "/content/banner/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteBanner
);

router.get("/content/banners", getAllBanners);

module.exports = router;
