import React, { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { actionTypes } from "../redux/actionTypes";

const SocketClient = () => {
  const socket = useSelector(
    (state) => state.socket
  );
  const dispatch = useDispatch();

  //for createComment realtime
  useEffect(() => {
    if (!socket) return;
    socket.on("createComment", (data) => {
      console.log("hit");
      dispatch({
        type: actionTypes.CREATECOMMENT,
        payload: { ...data },
      });
    });
  }, [socket, dispatch]);

  //for replyComment realtime
  useEffect(() => {
    if (!socket) return;
    socket.on("replyComment", (data) => {
      dispatch({
        type: actionTypes.REPLYCOMMENT,
        payload: {
          ...data,
        },
      });
    });
  }, [socket, dispatch]);

  //for updateComment realtime
  useEffect(() => {
    if (!socket) return;
    socket.on("updateComment", (data) => {
      dispatch({
        type: actionTypes.UPDATECOMMENT,
        payload: { ...data },
      });
    });
  }, [socket, dispatch]);

  //for commnetDelete realtime
  useEffect(() => {
    if (!socket) return;
    socket.on("deleteComment", (data) => {
      console.log("hit");
      dispatch({
        type: actionTypes.DELETECOMMENT,
        payload: { ...data },
      });
    });
  }, [socket, dispatch]);

  return <div></div>;
};

export default SocketClient;
