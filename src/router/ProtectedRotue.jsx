import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/userAuth";

const ProtectedRotue = () => {
  const { auth } = useAuthContext();
  return auth?.currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRotue;
