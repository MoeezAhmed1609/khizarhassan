import { createReducer } from "@reduxjs/toolkit";
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
const initialState = {
  categories: [],
};

export const categoryReducer = createReducer(initialState.categories, (builder) => {
  builder.addCase(CREATE_CATEGORY_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(CREATE_CATEGORY_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(CREATE_CATEGORY_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(GET_ALL_CATEGORIES_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_ALL_CATEGORIES_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(GET_ALL_CATEGORIES_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(DELETE_CATEGORY_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(DELETE_CATEGORY_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload,
    };
  });
  builder.addCase(DELETE_CATEGORY_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
