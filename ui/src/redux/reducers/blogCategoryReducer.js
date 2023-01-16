const { actionTypes } = require("../actionTypes");

const blogCategoryReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case actionTypes.GETBLOGSBYCATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export default blogCategoryReducer;
