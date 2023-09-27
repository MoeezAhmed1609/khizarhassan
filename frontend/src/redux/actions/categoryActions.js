import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "../constants/categoryConstants";
import axios from "axios";
import toast from "react-hot-toast";

export const createCategory = (title, image) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  const data = await axios({
    url: "/api/v1/category/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      title,
      image,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
      toast.success("Category Created, Reloading!");
      setTimeout(window.location.reload(), 5000);
    })
    .catch((err) => {
      dispatch({ type: CREATE_CATEGORY_FAIL, payload: err });
      toast.error("Something went wrong, Reload!");
    });
};

// Get All CATEGORYs
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
    const data = await axios.get("/api/v1/categories");
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data?.data?.categories,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete category
export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  const data = await axios({
    url: `/api/v1/category/delete/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: res.data });
      toast.success("Category Deleted, Reloading!");
      setTimeout(window.location.reload(), 5000);
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CATEGORY_FAIL,
        payload: err,
      });
      toast.error("Something went wrong, Reload!");
    });
};
