import { useQueryClient, useQuery } from "react-query";
import axiosInstance from "../axios";
import Skill from "./Skill";

const Sidebar = ({ getSkills, setSelectedSkill }) => {
  const queryClient = useQueryClient();
  const skills = useQuery("skills", getSkills);
  return (
    <div className="fixed z-0 h-screen bg-gray-500 top-0 left-0 h-screen w-64">
      <div className="text-center">My Skills</div>
      <button onClick={() => setSelectedSkill(null)}>New Skill</button>
      <div className="skills-container flex flex-col gap-1">
        {skills.isLoading
          ? null
          : skills.data.map((skill, i) => (
              <Skill
                key={i}
                skill={skill}
                setSelectedSkill={setSelectedSkill}
              />
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
