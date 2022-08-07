import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Explore from "../pages/home/Explore";
import Offers from "../pages/offers/Offers";
import Profile from "../pages/profile/Profile";
import SignIn from "../pages/logIn/SignIn";
import SignUp from "../pages/register/SignUp";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Navbar from "../components/navBar/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
};

export default AppRouter;
