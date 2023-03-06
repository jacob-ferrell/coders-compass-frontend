import LoginForm from "./LoginForm";
import axiosInstance from "../../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post("token/", {
      email: formData.email,
      password: formData.password,
    });
    localStorage.setItem("access_token", res?.data?.access);
    localStorage.setItem("refresh_token", res?.data?.refresh);
    axiosInstance.defaults.headers["Authorization"] =
      "JWT " + localStorage.getItem("access_token");
    navigate('/');
  };

  return (
    <div className="flex justify-center bg-gray-200 rounded-xl shadow border">
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
