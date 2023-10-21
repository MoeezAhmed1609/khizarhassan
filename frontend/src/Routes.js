import React from "react";
// React Router Dom Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components Import
import Header from "./components/header";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsApp from "./components/WhatsApp";
import MetaPixel from "./assets/pixel";
// Pages import
import Home from "./pages/Home";
import Product from "./pages/Product";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Shop from "./pages/Shop";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
const WebRoutes = (favorite) => {
  return (
    <Router>
      <MetaPixel />
      <Toaster />
      <ScrollToTop />
      <Header />
      <WhatsApp />
      <Routes>
        <Route path="/" element={<Home handleAddToFavorites={favorite} />} />
        <Route
          path="/shop"
          element={<Shop handleAddToFavorites={favorite} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/product/:id"
          element={<Product handleAddToFavorites={favorite} />}
        />
        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="/cart"
          element={<Cart handleAddToFavorites={favorite} />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default WebRoutes;
