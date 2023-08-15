const express = require("express");
const {
  createNewOrder,
  getAllOrderDetails,
  getSingleOrderDetails,
  getUserOrderDetails,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
const router = express.Router();

router.post("/order/create", isAuthenticatedUser, createNewOrder);
router.get(
  "/orders",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getAllOrderDetails
);
router.get(
  "/order/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getSingleOrderDetails
);
router.get("/order/me/:id", isAuthenticatedUser, getUserOrderDetails);
router.put(
  "/order/update/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateOrder
);
router.put(
  "/order/update/status/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateOrderStatus
);
router.delete(
  "/order/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteOrder
);

module.exports = router;
