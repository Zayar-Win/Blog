import axios from "axios";
import { actionTypes } from "../actionTypes";

export const createComment =
  (commentData, auth) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.post(
        "/api/comment",
        commentData,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const getComments =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GETCOMMENTS,
        payload: {},
      });
      const { data } = await axios.get(
        `/api/comment/blog/${id}`
      );
      const { comments, count } = data;
      dispatch({
        type: actionTypes.GETCOMMENTS,
        payload: { comments, count },
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

export const replyComment =
  (replydata, auth) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/comment/reply-comment",
        replydata,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const commentUpdate =
  (comment, auth) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/comment/${comment._id}`,
        { data: comment },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const deleteComment =
  (comment, auth) => async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/comment/${comment._id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };
