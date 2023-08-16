import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    VERIFY_SUCCESS,
    VERIFY_FAIL,
    SEND_CODE_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from "./types";

import UserService from "../services/user.service";
import accountService from "../services/account.service";
import authService from "../services/auth.service";

export const register = (name, prename, email, password, phone) => (dispatch) => {
  return authService.register(name, prename, email, password, phone).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Registering User failed. Make sure the email and phone number aren't already registered!"

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return authService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Login Failed"

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const verify = (phone, code) => (dispatch) => {
  return authService.verify(phone, code).then(
    (data) => {
      dispatch({
        type: VERIFY_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Verify Failed. Make sure to enter the right code!"

      dispatch({
        type: VERIFY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const sendCode = (phone, code) => (dispatch) => {
  return authService.sendCode(phone, code).then(
    (data) => {
      dispatch({
        type: SEND_CODE_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Code send if phone number is registered."

      dispatch({
        type: SEND_CODE_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const resetPassword = (phone, code, password) => (dispatch) => {
  return authService.resetPassword(phone, code, password).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Successfully reset password"

      dispatch({
        type: RESET_PASSWORD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const changePassword = (oldpassword, password) => (dispatch) => {
  return accountService.changePassword(oldpassword, password).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      const message = "Successfully updated password."
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Failed to change password. Make sure to enter the right old password."

      dispatch({
        type: RESET_PASSWORD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
