import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUp/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<App />} exact />

      </Routes>
      <App />
    </React.StrictMode>
  </Router>
);
