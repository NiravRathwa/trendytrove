import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
const AppRoutes: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/404" element={<NotFound />} /> */}
        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default AppRoutes;
