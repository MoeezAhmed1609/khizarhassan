// Css import
import "./App.css";
import { useEffect } from "react";
// React Router Dom Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// React Toast
import toast, { Toaster } from "react-hot-toast";
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
// Redux
import { store } from "./redux/store";
import { getUserDetails, addToFavorites } from "./redux/actions/userActions";
import { getAllProducts } from "./redux/actions/productsActions";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "./redux/actions/blogActions";
import { getAllBanners, getAllContents } from "./redux/actions/contentActions";
import { getAllCategories } from "./redux/actions/categoryActions";
import { getAllBrands } from "./redux/actions/brandsActions";

function Root() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // Add to favorites
  const handleAddToFavorites = (id) => {
    if (!isAuthenticated) {
      toast.error("You are not logged in!");
      window.setTimeout(function () {
        window.location.replace("/account");
      }, 2000);
      return;
    }
    const isFavorite = user?.favorites?.filter((fav) => fav._id === id);
    if (isFavorite.length !== 0) {
      toast("Already in your Favorites!");
      window.setTimeout(function () {
        window.location.replace("/favorite");
      }, 2000);
      return;
    }
    store.dispatch(addToFavorites(id));
  };

  useEffect(() => {
    // Get all banners
    dispatch(getAllBanners());
    // Get all products
    dispatch(getAllProducts());
    // Get all blogs
    dispatch(getAllBlogs());
    // Get logged in user information
    dispatch(getUserDetails());
    // Get all categories
    dispatch(getAllCategories());
    // get All brands
    dispatch(getAllBrands());
    // get contents
    dispatch(getAllContents());
  }, []);
  return (
    <>
      <Router>
        <MetaPixel />
        <Toaster />
        <ScrollToTop />
        <Header />
        <WhatsApp />
        <Routes>
          <Route
            path="/"
            element={<Home handleAddToFavorites={handleAddToFavorites} />}
          />
          <Route
            path="/shop"
            element={<Shop handleAddToFavorites={handleAddToFavorites} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route
            path="/product/:id"
            element={<Product handleAddToFavorites={handleAddToFavorites} />}
          />
          <Route path="/favorite" element={<Favorite />} />
          <Route
            path="/cart"
            element={<Cart handleAddToFavorites={handleAddToFavorites} />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default Root;
