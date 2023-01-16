import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import blogCategoryReducer from "./blogCategoryReducer";
import blogDetailReducer from "./blogDetailReducer";
import blogReducer from "./blogReducer";
import blogUserReducer from "./blogUserReducer";
import categoryReducer from "./categoryReducer";
import commentReducer from "./commentReducer";
import otherUserInfoReducer from "./otherUserInfoReducer";
import searchBlogReducer from "./searchBlogReducers";
import socketReducer from "./socketReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  category: categoryReducer,
  blog: blogReducer,
  blogsCategory: blogCategoryReducer,
  otherUserInfo: otherUserInfoReducer,
  blogUser: blogUserReducer,
  blogDetail: blogDetailReducer,
  comment: commentReducer,
  socket: socketReducer,
  searchBlogs: searchBlogReducer,
});

export default rootReducer;
