import "./App.css";
import { useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import axiosInstance from "./axios";
import Nav from "./components/Nav";
import SkillPage from "./pages/SkillPage/SkillPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import getSkills from "./api/getSkills";
import mockData from "./data/mockResponse.json";

function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const skills = useQuery("skills", getSkills);
  const [skillToLearn, setSkillToLearn] = useState({});
  const [goals, setGoals] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [offsets, setOffsets] = useState({
    x: 0, y: 0
  });

  const margins = {
    paddingLeft: offsets.x + 'px',
    paddingTop: offsets.y + 'px'
  }

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
    <div className="max-h-screen max-w-screen bg-violet-50">
      <Nav
        skills={skills.isLoading ? null : skills.data}
        setOffsets={setOffsets}
        setSelectedSkill={setSelectedSkill}
      />
      <Routes>
        <Route path="/" element={<Dashboard margins={margins}/>} />
        <Route path="/skills/:id" element={<SkillPage style={margins} skill={selectedSkill}/>} />
      </Routes>
      {/* <div className="bg-gray-200" style={margins}>
        {selectedSkill && !skills.isLoading ? (
          <SkillPage skill={selectedSkill} />
        ) : (
          
        )}
      </div> */}
    </div>
  );
}

export default App;
