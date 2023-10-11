import { createReducer } from "@reduxjs/toolkit";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
  CREATE_FAVORITES_REQUEST,
  CREATE_FAVORITES_SUCCESS,
  CREATE_FAVORITES_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ALL_USER_DETAILS_REQUEST,
  GET_ALL_USER_DETAILS_SUCCESS,
  GET_ALL_USER_DETAILS_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../constants/userConstants";

const initialState = {
  user: {},
  favorites: [],
  users: [],
  orders: [],
};
export const userReducer = createReducer(initialState.user, (builder) => {
  builder.addCase(LOGIN_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOGIN_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });
  builder.addCase(LOGIN_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(REGISTER_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(REGISTER_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });
  builder.addCase(REGISTER_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(GET_USER_DETAILS_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(GET_USER_DETAILS_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload.data.user,
    };
  });
  builder.addCase(GET_USER_DETAILS_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(LOGOUT_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOGOUT_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
    };
  });
  builder.addCase(LOGOUT_USER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_PROFILE_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(UPDATE_PROFILE_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(UPDATE_PROFILE_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_PASSWORD_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(UPDATE_PASSWORD_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(UPDATE_PASSWORD_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(FORGOT_PASSWORD_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(FORGOT_PASSWORD_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(FORGOT_PASSWORD_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(ADD_TO_CART_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(ADD_TO_CART_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(ADD_TO_CART_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(CREATE_ORDER_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(CREATE_ORDER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(CREATE_ORDER_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_USER_ROLE_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(UPDATE_USER_ROLE_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(UPDATE_USER_ROLE_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(DELETE_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(DELETE_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(DELETE_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(UPDATE_ORDER_STATUS_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(UPDATE_ORDER_STATUS_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(UPDATE_ORDER_STATUS_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
  builder.addCase(CREATE_REVIEW_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(CREATE_REVIEW_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(CREATE_REVIEW_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
});

export const favoritesReducer = createReducer(
  initialState.favorites,
  (builder) => {
    builder.addCase(GET_FAVORITES_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(GET_FAVORITES_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(GET_FAVORITES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_FAVORITES_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(CREATE_FAVORITES_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(CREATE_FAVORITES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);

export const allUserReducer = createReducer(initialState.user, (builder) => {
  builder.addCase(GET_ALL_USER_DETAILS_REQUEST, (state, action) => {
    return {
      loading: true,
      users: [],
    };
  });
  builder.addCase(GET_ALL_USER_DETAILS_SUCCESS, (state, action) => {
    return {
      loading: false,
      users: action.payload,
    };
  });
  builder.addCase(GET_ALL_USER_DETAILS_FAIL, (state, action) => {
    return {
      loading: false,
      users: [],
      error: action.payload,
    };
  });
});

export const ordersReducer = createReducer(initialState.orders, (builder) => {
  builder.addCase(GET_ORDERS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: [],
    };
  });
  builder.addCase(GET_ORDERS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload.data,
    };
  });
  builder.addCase(GET_ORDERS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
