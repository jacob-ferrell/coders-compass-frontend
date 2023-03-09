import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios";
import Header from "./components/Header";
import mockData from "./data/mockResponse.json";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [skillToLearn, setSkillToLearn] = useState("");
  const [goals, setGoals] = useState([]);
  /* useEffect(() => {
    
  }, []); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* setData(mockData)
    console.log(mockData.response.split(/\n\d[.]/).slice(1)) */
    await axiosInstance.post("skills/", {
      name: skillToLearn,
    })
    const res = await axiosInstance.get(
      `chatgpt/?skill=${encodeURIComponent(skillToLearn)}`
    );
    console.log(res)
    setGoals(res?.data?.response);
  };


  return (
    <div>
      <Header />
      <div className="bg-gray-200  p-5">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="skill">Skill To Learn</label>
          <input
            onChange={(e) => setSkillToLearn(e.target.value)}
            type="text"
            name="skill"
          />
          <button className="bg-purple-500" type="submit">
            Submit
          </button>
        </form>
        {goals?.map((goal, i) => <div key={i}>{goal}</div>)}
      </div>
    </div>
  );
}

export default App;
