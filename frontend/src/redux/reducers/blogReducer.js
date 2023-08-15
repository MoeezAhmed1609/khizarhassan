import { createReducer } from "@reduxjs/toolkit";
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
const initialState = {
  blogs: [],
  blog: {},
};

export const blogsReducer = createReducer(initialState.blogs, (builder) => {
  builder.addCase(CREATE_BLOG_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(CREATE_BLOG_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(CREATE_BLOG_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(GET_ALL_BLOG_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_ALL_BLOG_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(GET_ALL_BLOG_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPLOAD_BLOG_IMAGE_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(UPLOAD_BLOG_IMAGE_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(UPLOAD_BLOG_IMAGE_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});

export const blogReducer = createReducer(initialState.blog, (builder) => {
  builder.addCase(GET_BLOG_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_BLOG_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(GET_BLOG_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
