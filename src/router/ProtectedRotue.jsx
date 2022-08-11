import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/userAuth";

const ProtectedRotue = () => {
  const { auth, token } = useAuthContext();
  const user = localStorage.getItem("token");
  console.log(user);

  return auth?.currentUser || token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRotue;
