import { actionTypes } from "../actionTypes";
import axios from "axios";
import { validRegister } from "../../utils/valid";

export const login =
  (logindata) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.post(
        "/api/auth/login",
        logindata,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: actionTypes.AUTH,
        payload: {
          token: data.access_token,
          user: data.user,
        },
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          success: "Login Successful!!",
        },
      });
      localStorage.setItem("LoggedIn", "true");
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
      console.log(err.response.data.message);
    }
  };

export const register =
  (registerdata) => async (dispatch) => {
    try {
      const check = validRegister(registerdata);
      console.log(check.errLength);
      if (check.errLength > 0) {
        dispatch({
          type: actionTypes.ALERT,
          payload: {
            errors: check.errors,
          },
        });
        return;
      }
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.post(
        "/api/auth/register",
        registerdata
      );
      dispatch({
        type: actionTypes.ALERT,
        payload: { success: data.message },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const refreshToken =
  () => async (dispatch) => {
    try {
      const isLogged =
        localStorage.getItem("LoggedIn");
      if (!isLogged) {
        return;
      }
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.get(
        "/api/auth/refreshtoken"
      );
      dispatch({
        type: actionTypes.AUTH,
        payload: {
          token: data.access_token,
          user: data.user,
        },
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: {},
      });
    } catch (err) {
      console.log(err);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "/api/auth/logout"
    );
    dispatch({
      type: actionTypes.ALERT,
      payload: { success: data.message },
    });
    dispatch({
      type: actionTypes.AUTH,
      payload: {},
    });
    localStorage.removeItem("LoggedIn");
  } catch (err) {
    dispatch({
      type: actionTypes.ALERT,
      payload: {
        success: err.response.data.message,
      },
    });
  }
};
