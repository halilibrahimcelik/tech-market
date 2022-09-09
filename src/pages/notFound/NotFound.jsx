import React, { useState, useEffect } from "react";
import styles from "./NotFound.module.scss";
import image from "../../assets/not found.jpg";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

const NotFound = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <img src={image} alt="" />
      <button onClick={() => navigate("/")}>Go Back </button>
    </div>
  );
};

export default NotFound;
