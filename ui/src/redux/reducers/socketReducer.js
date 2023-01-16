import { actionTypes } from "../actionTypes";
const socketReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
