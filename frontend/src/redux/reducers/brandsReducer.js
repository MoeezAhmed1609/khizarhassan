import { createReducer } from "@reduxjs/toolkit";
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
const initialState = {
  brands: [],
};

export const brandsReducer = createReducer(initialState.brands, (builder) => {
  builder.addCase(CREATE_BRANDS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(CREATE_BRANDS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(CREATE_BRANDS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(GET_ALL_BRANDS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_ALL_BRANDS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(GET_ALL_BRANDS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(DELETE_BRANDS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(DELETE_BRANDS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(DELETE_BRANDS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
