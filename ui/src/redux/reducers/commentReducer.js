import { actionTypes } from "../actionTypes";

const commentReducer = (
  state = { comments: [], count: 0 },
  action
) => {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.CREATECOMMENT:
      return {
        ...state,
        comments: [
          action.payload,
          ...state.comments,
        ],
      };
    case actionTypes.GETCOMMENTS:
      return action.payload;

    case actionTypes.REPLYCOMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id ===
          action.payload.comment_root
            ? {
                ...comment,
                replyComment: [
                  ...comment.replyComment,
                  action.payload,
                ],
              }
            : comment
        ),
      };

    case actionTypes.UPDATECOMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id
            ? action.payload
            : comment
        ),
      };

    case actionTypes.DELETECOMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) =>
            comment._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export default commentReducer;
