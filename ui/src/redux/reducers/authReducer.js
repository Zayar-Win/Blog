import { actionTypes } from "../actionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
