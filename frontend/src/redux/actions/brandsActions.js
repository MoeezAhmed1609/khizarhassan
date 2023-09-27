import {
  CREATE_BRANDS_REQUEST,
  CREATE_BRANDS_SUCCESS,
  CREATE_BRANDS_FAIL,
  GET_ALL_BRANDS_REQUEST,
  GET_ALL_BRANDS_SUCCESS,
  GET_ALL_BRANDS_FAIL,
  DELETE_BRANDS_REQUEST,
  DELETE_BRANDS_SUCCESS,
  DELETE_BRANDS_FAIL,
} from "../constants/brandsConstants";
import axios from "axios";
import toast from "react-hot-toast";

export const createBrands = (title, image) => async (dispatch) => {
  dispatch({ type: CREATE_BRANDS_REQUEST });
  const data = await axios({
    url: "/api/v1/brands/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      title,
      image,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_BRANDS_SUCCESS, payload: res.data });
      toast.success("Brand Created, Reloading!");
      setTimeout(window.location.reload(), 5000);
    })
    .catch((err) => {
      dispatch({ type: CREATE_BRANDS_FAIL, payload: err });
      toast.error("Something went wrong, Reload!");
    });
};

// Get All BRANDSs
export const getAllBrands = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BRANDS_REQUEST });
    const data = await axios.get("/api/v1/brands");
    dispatch({
      type: GET_ALL_BRANDS_SUCCESS,
      payload: data?.data?.brands,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BRANDS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete BRANDS
export const deleteBrands = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BRANDS_REQUEST });
  const data = await axios({
    url: `/api/v1/brands/delete/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      dispatch({ type: DELETE_BRANDS_SUCCESS, payload: res.data });
      toast.success("Brand Deleted, Reloading!");
      setTimeout(window.location.reload(), 5000);
    })
    .catch((err) => {
      dispatch({
        type: DELETE_BRANDS_FAIL,
        payload: err,
      });
      toast.error("Something went wrong, Reload!");
    });
};
