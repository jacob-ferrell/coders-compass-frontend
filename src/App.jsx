import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import Header from "./components/Header";


function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    
  }, []);
  return (
    <div>
      <Header />
      <div className="bg-gray-200 flex flex-col p-5">
        <label htmlFor="skill">Skill To Learn</label>
        <input type="text" name="skill" />
        <div>{data}</div>
      </div>
      

    </div>
  );
}

export default App;
