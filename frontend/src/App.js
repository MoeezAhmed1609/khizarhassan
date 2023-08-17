// Css import
import "./App.css";
import { useEffect } from "react";
// React Router Dom Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components Import
import Header from "./components/header";
import Footer from "./components/footer";
// Pages import
import Home from "./pages/Home";
import Product from "./pages/Product";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
// Redux
import { store } from "./redux/store";
import { getUserDetails, addToFavorites } from "./redux/actions/userActions";
import { getAllProducts } from "./redux/actions/productsActions";
import { useSelector } from "react-redux";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import { getAllBlogs } from "./redux/actions/blogActions";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import About from "./pages/About";
import { getAllBanners } from "./redux/actions/contentActions";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // Add to favorites
  const handleAddToFavorites = (id) => {
    if (!isAuthenticated) {
      window.location.replace("/account");
      return;
    }
    const isFavorite = user?.favorites?.filter((fav) => fav._id === id);
    if (isFavorite.length !== 0) {
      window.location.replace("/favorite");
      return;
    }
    store.dispatch(addToFavorites(id));
    window.location.replace("/favorite");
  };

  useEffect(() => {
    // Get logged in user information
    store.dispatch(getUserDetails());
    // Get all banners
    store.dispatch(getAllBanners());
    // Get all products
    store.dispatch(getAllProducts());
    // Get all blogs
    store.dispatch(getAllBlogs());
  }, [store.dispatch]);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
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

export default App;
