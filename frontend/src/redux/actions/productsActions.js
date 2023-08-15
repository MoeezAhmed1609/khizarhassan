import axios from "axios";
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  ADD_TO_CART,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAIL,
} from "../constants/productsConstants";

// Get All Products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    const data = await axios.get("/api/v1/products");
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create new product
export const createProduct = (product, images) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  const data = await axios({
    url: "/api/v1/products/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      product,
      images,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: CREATE_PRODUCT_FAIL, payload: err });
    });
};

// Get Product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
    const data = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update product
export const updateProduct = (id, product, images) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  const data = await axios({
    url: `/api/v1/products/update/${id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      product,
      images,
    },
  })
    .then((res) => {
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_PRODUCT_FAIL, payload: err });
    });
};

// delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const data = await axios({
      url: `/api/v1/products/delete/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

// Add to cart
export const addToCart = (id, size) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { id: id, size: size } });
};

// Get All Product reviews
export const getAllProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST });
    const data = await axios({
      url: `/api/v1/product/reviews/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: GET_PRODUCT_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEWS_FAIL,
      payload: error,
    });
  }
};
