import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import Logout from "./components/Logout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<App />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </Router>
);
