import { configureStore } from "@reduxjs/toolkit";

// Reducers Import
import {
  productReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import {
  favoritesReducer,
  userReducer,
  allUserReducer,
} from "./reducers/userReducer";
import { blogsReducer, blogReducer } from "./reducers/blogReducer";
import { bannersReducer } from "./reducers/contentReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { brandsReducer } from "./reducers/brandsReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: productDetailReducer,
    user: userReducer,
    favorites: favoritesReducer,
    users: allUserReducer,
    cart: cartReducer,
    blogs: blogsReducer,
    blog: blogReducer,
    banners: bannersReducer,
    category: categoryReducer,
    brands: brandsReducer,
  },
});
