import { createReducer } from "@reduxjs/toolkit";
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
} from "../constants/contentConstants";
const initialState = {
  banners: [],
};

export const bannersReducer = createReducer(initialState.banners, (builder) => {
  builder.addCase(GET_BANNERS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_BANNERS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(GET_BANNERS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPLOAD_BANNER_REQUEST, (state, action) => {
    return {
      loading: true,
    };
  });
  builder.addCase(UPLOAD_BANNER_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(UPLOAD_BANNER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(DELETE_BANNER_REQUEST, (state, action) => {
    return {
      loading: true,
    };
  });
  builder.addCase(DELETE_BANNER_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(DELETE_BANNER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
