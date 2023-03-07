import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";


function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    
  }, []);
  return (
    <div>
      <Header />

      

    </div>
  );
}

export default App;
