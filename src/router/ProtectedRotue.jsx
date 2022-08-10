import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/userAuth";

const ProtectedRotue = () => {
  const { auth, token } = useAuthContext();
  console.log(auth);

  return auth?.currentUser?.displayName || token ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ProtectedRotue;
