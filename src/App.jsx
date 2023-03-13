import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import axiosInstance from "./axios";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Goal from "./components/Goal";
import SkillPage from "./pages/SkillPage/SkillPage";
import mockData from "./data/mockResponse.json";
import axios from "axios";

function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const skills = useQuery("skills", getSkills);
  const [skillToLearn, setSkillToLearn] = useState({});
  const [goals, setGoals] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const mutation = useMutation(postSkill, {
    onSuccess: () => queryClient.invalidateQueries("skills"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* setData(mockData)
    console.log(mockData.response.split(/\n\d[.]/).slice(1)) */
    mutation.mutate();
    const res = await axiosInstance.get(
      `chatgpt/?skill=${encodeURIComponent(skillToLearn.name)}`
    );
    console.log(res);
    setGoals(res?.data?.response.map((goal) => ({ description: goal })));
  };

  async function getSkills() {
    const res = await axiosInstance.get("skills/");
    for (let skill of res.data) {
      skill.goals = await getGoals(skill.id);
    }
    return res.data;
  }

  async function getGoals(skill) {
    const res = await axiosInstance.get(
      `skills/goal/?skill=${encodeURIComponent(skill)}`
    );
    return res.data;
  }

  async function postSkill() {
    const res = await axiosInstance.post("skills/", {
      name: skillToLearn.name,
    });
    setSkillToLearn((prev) => ({ name: prev.name, id: res.data.id }));
    return;
  }

  async function postGoals() {
    //e.preventDefault();
    /* return await axiosInstance.post(
      `skills/goal/?skill=${encodedURIComponent(skillToLearn.id)}`,
      goals
    ); */
    return await axiosInstance.post(`skills/goal/`, {
      goals: goals,
      skill: skillToLearn.id,
    });
  }

  return (
    <div>
      <Header />
      <Sidebar getSkills={getSkills} setSelectedSkill={setSelectedSkill} />
      <div className="bg-gray-200  p-5 h-full">
        {selectedSkill && !skills.isLoading ? (
          <SkillPage skillID={selectedSkill.id} />
        ) : (
          <>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="skill">Skill To Learn</label>
              <input
                onChange={(e) => setSkillToLearn({ name: e.target.value })}
                type="text"
                name="skill"
              />
              {goals?.map((goal, i) => (
                <div className="text-left" key={i}>{`${i + 1}.${
                  goal.description
                }`}</div>
              ))}
              <button className="bg-purple-500" type="submit">
                Submit
              </button>
            </form>
            {!!goals.length ? (
              <button className="mt-4" onClick={postGoals}>
                Save Goals
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
