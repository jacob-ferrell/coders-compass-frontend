import axiosInstance from "../axios";

export default async function getSkills() {
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
