import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Alert from "./components/alert/Alert";
import Active from "./pages/Active";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { refreshToken } from "./redux/actions/authActions";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import { getAllCategory } from "./redux/actions/categoryActions";
import CreateCategory from "./pages/CreateCategory";
import { getBlogs } from "./redux/actions/blogAction";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import io from "socket.io-client";
import { actionTypes } from "./redux/actionTypes";
import SocketClient from "./components/SocketClient";
import UpdateBlog from "./pages/UpdateBlog";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(
    (state) => state.blog.blogs
  );
  const socket = useSelector(
    (state) => state.socket
  );

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getAllCategory());
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({
      type: actionTypes.SOCKET,
      payload: socket,
    });
    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <div className='app'>
      <Header />
      <SocketClient />
      <Alert />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/active/:id'
          element={<Active />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/createcategory'
          element={<CreateCategory />}
        />
        <Route
          path='/profile/:id'
          element={<Profile />}
        />
        <Route
          path='/blog/update_blog/:id'
          element={<UpdateBlog />}
        />
        <Route
          path='/createblog'
          element={<CreateBlog />}
        />
        <Route
          path='/categories/:category'
          element={<Blogs />}
        />
        <Route
          path='/search'
          element={<SearchPage />}
        />
        <Route
          path='/blogs/:id'
          element={<BlogDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
