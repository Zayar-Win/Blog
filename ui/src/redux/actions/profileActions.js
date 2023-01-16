import axios from "axios";
import {
  checkFile,
  imageUpload,
} from "../../utils/checkFile";
import { actionTypes } from "../actionTypes";

const updateUser =
  (name, avatar, auth) => async (dispatch) => {
    try {
      let url;
      if (avatar) {
        const check = checkFile(avatar);

        if (check) {
          return dispatch({
            type: actionTypes.ALERT,
            payload: { errors: check },
          });
        }
        const photo = await imageUpload(avatar);

        url = photo.data.secure_url;
      }

      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });

      const { data } = await axios.patch(
        "/api/user/profileUpdate",
        {
          name: name ? name : auth.user.name,
          avatar: url ? url : auth.user.avatar,
        },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch({
        type: actionTypes.AUTH,
        payload: {
          token: auth.token,
          user: {
            ...auth.user,
            name: name ? name : auth.user.name,
            avatar: url ? url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: actionTypes.ALERT,
        payload: { success: data.message },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: err.response.data.message,
      });
    }
  };

export const resetPassword =
  (password, token) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.patch(
        "/api/user/resetPassword",
        { password },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
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

export const getOtherUserInfo =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.get(
        `/api/user/${id}`
      );
      dispatch({
        type: actionTypes.GETOTHERUSERINFO,
        payload: data,
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: false },
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

export default updateUser;
