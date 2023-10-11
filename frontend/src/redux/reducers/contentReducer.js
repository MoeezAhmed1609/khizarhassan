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
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_SUCCESS,
  UPDATE_CONTENT_FAIL,
  GET_CONTENTS_REQUEST,
  GET_CONTENTS_SUCCESS,
  GET_CONTENTS_FAIL,
} from "../constants/contentConstants";
const initialState = {
  banners: [],
  contents: [],
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
export const contentsReducer = createReducer(
  initialState.contents,
  (builder) => {
    builder.addCase(GET_CONTENTS_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(GET_CONTENTS_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(GET_CONTENTS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_CONTENT_REQUEST, (state, action) => {
      return {
        loading: true,
      };
    });
    builder.addCase(UPDATE_CONTENT_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(UPDATE_CONTENT_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);
