import {
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAIL,
  UPLOAD_BANNER_REQUEST,
  UPLOAD_BANNER_SUCCESS,
  UPLOAD_BANNER_FAIL,
} from "../constants/contentConstants";
import axios from "axios";

export const changeBanner = (id, banner, caption) => async (dispatch) => {
  dispatch({ type: UPLOAD_BANNER_REQUEST });
  const data = await axios({
    url: "/api/v1/content/banner/update",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      id,
      banner,
      caption,
    },
  })
    .then((res) => {
      dispatch({ type: UPLOAD_BANNER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_BANNER_FAIL, payload: err });
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
