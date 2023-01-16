const { actionTypes } = require("../actionTypes");

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY:
      return action.payload;
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          action.payload,
        ],
      };
    case actionTypes.UPDATE_CATEGORY:
      const data = state.categories.map((item) =>
        item._id === action.payload.data._id
          ? {
              ...item,
              name: action.payload.data.name,
            }
          : item
      );
      return {
        ...state,
        categories: data,
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (item) =>
            item._id !== action.payload.data._id
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;
