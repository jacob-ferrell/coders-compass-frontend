import { Link } from "react-router-dom";

export default function SidebarSkill({ skill, setSelectedSkill }) {


  return (
    <li
      className="text-left pl-5 cursor-pointer"
      data-id={skill.id}
      onClick={(e) => setSelectedSkill(skill)}
    >
      <Link to={"\skills/" + skill.id} className="flex">
        <div>{skill.name}</div>
      </Link>
    </li>
  );
}
