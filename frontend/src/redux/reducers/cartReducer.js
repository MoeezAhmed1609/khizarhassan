import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size, flavor, quantity } = action.payload;
      state.cart = [...state.cart, { product, size, flavor, quantity }];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart.splice(
        state.cart.findIndex((item) => item.product._id === action.payload),
        1
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart } = cartReducer.actions;

export default cartReducer.reducer;
