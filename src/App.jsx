import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import Header from "./components/Header";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosInstance.get('test/')
      .then((data) => setData(data.data))
  }, []);
  return (
    <div>
      <Header />
      <div>{data?.message + ' ' + data?.user}</div>
      

    </div>
  );
}

export default App;
