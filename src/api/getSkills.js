import axiosInstance from "../axios";
import getGoals from "./getGoals";

export default async function getSkills() {
  const skills = await axiosInstance.get("skills/");
  const goals = await getGoals();
  for (let skill of skills.data) {
    skill.goals = goals.filter(g => g.skill === skill.id);
  }

  return skills.data;
}
