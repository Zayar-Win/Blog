import { actionTypes } from "../actionTypes";

const otherUserInfoReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case actionTypes.GETOTHERUSERINFO:
      return action.payload;
    default:
      return state;
  }
};

export default otherUserInfoReducer;
