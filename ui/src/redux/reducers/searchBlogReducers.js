import { actionTypes } from "../actionTypes";

const searchBlogReducer = (
  state = [],
  action
) => {
  switch (action.type) {
    case actionTypes.SEARCHBLOG:
      return action.payload;
    default:
      return state;
  }
};

export default searchBlogReducer;
