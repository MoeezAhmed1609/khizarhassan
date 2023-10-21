// Css import
import "./App.css";
import { useEffect } from "react";

import WebRoutes from "./Routes";

// React Toast
import toast from "react-hot-toast";

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
  return <WebRoutes favorite={handleAddToFavorites} />;
}

export default Root;
