const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  uploadContentImages,
} = require("../controllers/blogController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

router.post(
  "/blog/create",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  createBlog
);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlog);
router.post(
  "/blog/image",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  uploadContentImages
);

module.exports = router;
