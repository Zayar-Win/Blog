import { actionTypes } from "../actionTypes";

const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
