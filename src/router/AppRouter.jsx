import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Explore from "../pages/home/Explore";
import Offers from "../pages/offers/Offers";
import Profile from "../pages/profile/Profile";
import SignIn from "../pages/logIn/SignIn";
import SignUp from "../pages/register/SignUp";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Navbar from "../components/navBar/Navbar";
import ProtectedRotue from "./ProtectedRotue";
import Category from "../pages/category/Category";
import CreateList from "../pages/createList/CreateList";
import ListProduct from "../pages/listProduct/ListProduct";
import ContactDealer from "../pages/contactDealer/ContactDealer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="profile" element={<ProtectedRotue />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/profile/create-list" element={<ProtectedRotue />}>
          <Route path="" element={<CreateList />} />
        </Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<ListProduct />}
        />
        <Route path="/contact/:dealerId" element={<ContactDealer />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
};

export default AppRouter;
