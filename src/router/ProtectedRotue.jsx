import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/userAuth";

const ProtectedRotue = () => {
  const { auth } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);

  return auth?.currentUser || user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRotue;
