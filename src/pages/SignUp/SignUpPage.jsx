import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axios";

const SignUpPage = (props) => {
  //const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.password2)
      return alert("Passwords must match");
    let cleanFormData = { ...formData };
    delete cleanFormData.password2;
    const res = await axiosInstance.post("user/register/", { ...formData });
    console.log(res);
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  return (
    <div className="flex justify-center bg-gray-200 rounded-xl shadow border">
      <SignUpForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFormData={(data) => setFormData(data)}
      />
    </div>
  );
};

export default SignUpPage;
