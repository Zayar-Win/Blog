import axios from "axios";
import "../styles/active.scss";
import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  errorMessage,
  successMessage,
} from "../components/alert/Alert";

const Active = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  useEffect(() => {
    const activeAccount = async () => {
      try {
        if (id) {
          console.log("hit");
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/active",
            { token: id }
          );
          setSuccess(data.message);
        }
      } catch (err) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      }
    };
    activeAccount();
  }, [id]);
  return (
    <div className='active'>
      {error && errorMessage(error)}
      {success && successMessage(success)}
    </div>
  );
};

export default Active;
