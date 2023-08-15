const app = require("./app");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongodb.js");
const cloudinary = require("cloudinary");

// Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions");
  // Exit Server
  server.close(() => process.exit(1));
});

// Configuration
dotenv.config({ path: "backend/config/.env" });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const server = app.listen(process.env.PORT || 5000, () => {
  connectMongoDB();
  console.log("Server listening on port " + process.env.PORT);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejections");
  // Exit Server
  server.close(() => process.exit(1));
});
