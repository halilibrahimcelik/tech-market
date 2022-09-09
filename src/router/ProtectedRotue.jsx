import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { useAuthContext } from "../hook/userAuth";

const ProtectedRotue = () => {
  const { loggedIn, checkingStatus } = useAuthContext();

  if (checkingStatus) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRotue;
