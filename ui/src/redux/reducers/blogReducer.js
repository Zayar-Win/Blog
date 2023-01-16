import { actionTypes } from "../actionTypes";

const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GETBLOGS:
      return { ...state, blogs: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
