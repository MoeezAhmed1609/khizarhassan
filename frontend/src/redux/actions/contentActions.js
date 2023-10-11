import toast from "react-hot-toast";
import {
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAIL,
  UPLOAD_BANNER_REQUEST,
  UPLOAD_BANNER_SUCCESS,
  UPLOAD_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_SUCCESS,
  UPDATE_CONTENT_FAIL,
  GET_CONTENTS_REQUEST,
  GET_CONTENTS_SUCCESS,
  GET_CONTENTS_FAIL,
} from "../constants/contentConstants";
import axios from "axios";

export const changeBanner = (banner) => async (dispatch) => {
  dispatch({ type: UPLOAD_BANNER_REQUEST });
  const data = await axios({
    url: "/api/v1/content/banner/update",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      banner,
    },
  })
    .then((res) => {
      dispatch({ type: UPLOAD_BANNER_SUCCESS, payload: res.data });
      toast.success("Banner Uploaded, Reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_BANNER_FAIL, payload: err });
      toast.error("Something went wrong!");
      console.log(err);
    });
};

// Get All Banners
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BANNERS_REQUEST });
    const data = await axios.get("/api/v1/content/banners");
    dispatch({ type: GET_BANNERS_SUCCESS, payload: data?.data?.banners });
  } catch (error) {
    dispatch({
      type: GET_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete banner
export const deleteBanner = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BANNER_REQUEST });
  const data = await axios({
    url: `/api/v1/content/banner/delete/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      dispatch({ type: DELETE_BANNER_SUCCESS, payload: res?.data });
      toast.success("Banner Deleted, reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      dispatch({
        type: DELETE_BANNER_FAIL,
        payload: err,
      });
      toast.error("Something went wrong, Reload!");
    });
};

export const updateContent = (contents) => async (dispatch) => {
  dispatch({ type: UPDATE_CONTENT_REQUEST });
  const data = await axios({
    url: "/api/v1/content/update",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      contents,
    },
  })
    .then((res) => {
      dispatch({ type: UPDATE_CONTENT_SUCCESS, payload: res.data });
      toast.success("Content Updated, Reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: UPDATE_CONTENT_FAIL, payload: err });
      toast.error("Something went wrong!");
      console.log(err);
    });
};

// Get All Banners
export const getAllContents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTENTS_REQUEST });
    const data = await axios.get("/api/v1/contents");
    dispatch({ type: GET_CONTENTS_SUCCESS, payload: data?.data?.contents });
  } catch (error) {
    dispatch({
      type: GET_CONTENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
