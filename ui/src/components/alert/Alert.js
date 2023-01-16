import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";

const Alert = () => {
  const alert = useSelector(
    (state) => state.alert
  );
  return (
    <div>
      {alert.loading && <CircularProgress />}
      {alert.success && (
        <Toast
          title={"Success"}
          bgColor='green'
          data={alert.success}
        />
      )}
      {alert.errors && (
        <Toast
          title={"Errors"}
          bgColor='red'
          data={alert.errors}
        />
      )}
    </div>
  );
};

export const errorMessage = (message) => {
  return <p className='errMessage'>{message}</p>;
};
export const successMessage = (message) => {
  return (
    <p className='successMessage'>{message}</p>
  );
};

export default Alert;
