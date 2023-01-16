import { actionTypes } from "../actionTypes";

const blogDetailReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case actionTypes.GETBLOGDETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default blogDetailReducer;
