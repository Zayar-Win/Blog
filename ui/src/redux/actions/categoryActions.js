import { actionTypes } from "../actionTypes";
import axios from "axios";

export const getAllCategory =
  (auth) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });

      const { data } = await axios.get(
        "/api/category"
      );
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: false },
      });
      dispatch({
        type: actionTypes.CATEGORY,
        payload: { categories: data },
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

export const addNewCategory =
  (category, auth) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.post(
        "/api/category",
        { name: category },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch({
        type: actionTypes.ALERT,
        payload: { success: data.message },
      });
      dispatch({
        type: actionTypes.CREATE_CATEGORY,
        payload: data.category,
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

export const changeCategory =
  (newData, auth) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.patch(
        `/api/category/${newData._id}`,
        { name: newData.name },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: false },
      });
      dispatch({
        type: actionTypes.UPDATE_CATEGORY,
        payload: { data: newData },
      });
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

export const deleteCategory =
  (category, auth) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.delete(
        `/api/category/${category._id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        payload: { data: category },
      });
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
