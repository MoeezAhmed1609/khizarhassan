const express = require("express");
const {
  getAllBanners,
  changeBanner,
  changeCaption,
  deleteBanner,
  createContent,
  updateContent,
  getAllContents,
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

router.post(
  "/content/create",
  // isAuthenticatedUser,
  // isAuthorizedRole("Admin"),
  createContent
);
router.put(
  "/content/update",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateContent
);
router.get("/contents", getAllContents);

module.exports = router;
