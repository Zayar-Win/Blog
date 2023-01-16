import { actionTypes } from "../actionTypes";

const blogUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GETBLOGSBYUSERS:
      return action.payload;

    case actionTypes.DELETEBLOG:
      return {
        ...state,
        blogs: state.blogs.filter(
          (blog) =>
            blog._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default blogUserReducer;
