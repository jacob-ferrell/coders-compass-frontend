import { useQueryClient, useQuery } from "react-query";
import axiosInstance from "../axios";

const Sidebar = ({getSkills}) => {
    const queryClient = useQueryClient();
    const skills = useQuery('skills', getSkills);
    return (
        <div className="fixed z-0 h-screen bg-gray-500 top-0 left-0 h-screen w-64">
            {skills.isLoading ? null : skills.data.map(skill => <div data-id={skill.id}>{skill.name}</div>)}
        </div>
    );
}

export default Sidebar;