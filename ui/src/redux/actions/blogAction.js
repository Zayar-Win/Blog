import axios from "axios";
import { imageUpload } from "../../utils/checkFile";
import { validBlog } from "../../utils/valid";
import { actionTypes } from "../actionTypes";

export const createBlog =
  (blogData, auth) => async (dispatch) => {
    try {
      let url = "";
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const check = validBlog(blogData);
      if (check.errLength > 0) {
        return dispatch({
          type: actionTypes.ALERT,
          payload: { errors: check.errMessage },
        });
      }
      if (
        typeof blogData.thumbnail !== "string"
      ) {
        const photo = await imageUpload(
          blogData.thumbnail
        );
        url = photo.data.secure_url;
      }
      const prefectData = {
        ...blogData,
        thumbnail: url,
      };
      const { data } = await axios.post(
        "/api/blog/createblog",
        prefectData,
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
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        paylaod: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const getBlogs =
  () => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.get(
        "/api/blog/getblogs"
      );

      dispatch({
        type: actionTypes.GETBLOGS,
        payload: data.blogs,
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: "Something wrong",
        },
      });
    }
  };

export const blogsByCategory =
  (category, search) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const page = search ? search : "?page=1";
      const { data } = await axios.get(
        `/api/blog/category/${category._id}${page}`
      );
      dispatch({
        type: actionTypes.GETBLOGSBYCATEGORY,
        payload: { ...data, id: category._id },
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

export const getUserBlogs =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      const { data } = await axios.get(
        `/api/blog/user/${id}`
      );
      const { blogs, total } = data;
      dispatch({
        type: actionTypes.GETBLOGSBYUSERS,
        payload: { blogs, total, id },
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

export const getBlogDetails =
  (id) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: true },
      });
      dispatch({
        type: actionTypes.GETBLOGDETAILS,
        payload: {},
      });
      const { data } = await axios.get(
        `/api/blog/${id}`
      );
      dispatch({
        type: actionTypes.GETBLOGDETAILS,
        payload: data,
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: { loading: false },
      });
    } catch (err) {
      console.log("hit");
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const updateBlog =
  (blogData, auth) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/blog/${blogData._id}`,
        blogData,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch({
        type: actionTypes.GETBLOGDETAILS,
        payload: { ...data },
      });

      console.log(data);
    } catch (err) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          errors: err.response.data.message,
        },
      });
    }
  };

export const deleteBlog =
  (blog, auth) => async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/blog/${blog._id}`,
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch({
        type: actionTypes.DELETEBLOG,
        payload: { ...data },
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

export const searchBlog =
  (search) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/blog/search?title=${search}`
      );
      dispatch({
        type: actionTypes.SEARCHBLOG,
        payload: data,
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
