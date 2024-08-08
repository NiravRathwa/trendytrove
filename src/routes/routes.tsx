import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import ProductList from "pages/products/ProductList";
import ProductOverview from "pages/products/ProductOverview";
import InternetStatus from "components/Internert/InternetStatus";
const AppRoutes: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <InternetStatus>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductOverview />} />

            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/404" element={<NotFound />} /> */}
            {/* <Route path="*" element={<Navigate to="/404" />} /> */}
          </Routes>
        </InternetStatus>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default AppRoutes;
