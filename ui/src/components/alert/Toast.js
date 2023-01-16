import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "../../styles/toast.scss";
import { actionTypes } from "../../redux/actionTypes";
import { useDispatch } from "react-redux";

const Toast = ({ title, bgColor, data }) => {
  const dispatch = useDispatch();
  const clearToast = () => {
    dispatch({
      type: actionTypes.ALERT,
      payload: {},
    });
  };
  return (
    <div
      className='toast'
      style={{ backgroundColor: `${bgColor}` }}
    >
      <h2>{title}</h2>
      <CloseIcon
        className='close'
        onClick={() => clearToast()}
      />

      {typeof data === "string" ? (
        <p>{data}</p>
      ) : (
        <ul>
          {data.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Toast;
