const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create new order
exports.createNewOrder = catchAsyncError(async (req, res, next) => {
  const { shipping, items, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    req.body.data;
  const order = await Order.create({
    shipping,
    items,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });
  res.status(200).json({ message: "Order created successfully!", order });
});

// Get all order details
exports.getAllOrderDetails = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("items.product");
  res.status(200).json({ orders });
});

// Get single order details
exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) return next(new ErrorHandler("Order not found!", 404));
  res.status(200).json({ order });
});

// Get users order details
exports.getUserOrderDetails = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.id });
  if (!orders)
    return next(new ErrorHandler("This user does not have any order!", 404));
  res.status(200).json({ orders });
});

// Update order
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered!", 400));
  }
  order.items.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({ order });
});
// Update order status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.body.id);
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({ order });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params, id);
  if (!order) {
    return next(
      new ErrorHandler(`Order with id: ${req.params.id} does not exist!`, 404)
    );
  }
  order = await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Order deleted successfully" });
});
