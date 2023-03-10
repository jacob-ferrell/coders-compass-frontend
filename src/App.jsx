import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import axiosInstance from "./axios";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import mockData from "./data/mockResponse.json";
import axios from "axios";

function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const skills = useQuery("skills", getSkills);
  const [data, setData] = useState(null);
  const [skillToLearn, setSkillToLearn] = useState("");
  const [mySkills, setMySkills] = useState([]);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    /* axiosInstance.get('skills/')
      .then(res => setMySkills(res)) */
  }, []);

  const mutation = useMutation(postSkill, {
    onSuccess: () => queryClient.invalidateQueries("skills"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* setData(mockData)
    console.log(mockData.response.split(/\n\d[.]/).slice(1)) */
    mutation.mutate({ name: skillToLearn });
    const res = await axiosInstance.get(
      `chatgpt/?skill=${encodeURIComponent(skillToLearn)}`
    );
    console.log(res);
    setGoals(res?.data?.response);
  };

  async function getSkills() {
    const res = await axiosInstance.get("skills/");
    return res.data;
  }

  async function postSkill() {
    return await axiosInstance.post("skills/", { name: skillToLearn });
  }

  return (
    <div>
      <Header />
      <Sidebar getSkills={getSkills} />
      <div className="bg-gray-200  p-5">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="skill">Skill To Learn</label>
          <input
            onChange={(e) => setSkillToLearn(e.target.value)}
            type="text"
            name="skill"
          />
          {goals?.map((goal, i) => (
            <div className="text-left" key={i}>{`${i + 1}.${goal}`}</div>
          ))}
          <button className="bg-purple-500" type="submit">
            Submit
          </button>
          {!!goals.length ? <button>Save Goals</button> : null}
        </form>
      </div>
    </div>
  );
}

export default App;
