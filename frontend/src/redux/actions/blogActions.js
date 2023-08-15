import {
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_BLOG_REQUEST,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  UPLOAD_BLOG_IMAGE_REQUEST,
  UPLOAD_BLOG_IMAGE_SUCCESS,
  UPLOAD_BLOG_IMAGE_FAIL,
} from "../constants/blogConstants";
import axios from "axios";

export const uploadBlog = (title, image, content) => async (dispatch) => {
  dispatch({ type: CREATE_BLOG_REQUEST });
  const data = await axios({
    url: "/api/v1/blog/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      title,
      image,
      content,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: CREATE_BLOG_FAIL, payload: err });
    });
};

export const uploadImage = (image) => async (dispatch) => {
  dispatch({ type: UPLOAD_BLOG_IMAGE_REQUEST });
  const data = await axios({
    url: "/api/v1/blog/image",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      image,
    },
  })
    .then((res) => {
      dispatch({ type: UPLOAD_BLOG_IMAGE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_BLOG_IMAGE_FAIL, payload: err });
    });
};

// Get All Blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BLOG_REQUEST });
    const data = await axios.get("/api/v1/blogs");
    dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data?.data?.blogs });
  } catch (error) {
    dispatch({
      type: GET_ALL_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get blog
export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_REQUEST });
    const data = await axios.get(`/api/v1/blog/${id}`);
    dispatch({ type: GET_BLOG_SUCCESS, payload: data?.data?.blog });
  } catch (error) {
    dispatch({
      type: GET_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};
