import axiosInstance from "../axios";

export default async function getGeneratedGoals(skillName) {
  const res = await axiosInstance.get(
    `chatgpt/?skill=${encodeURIComponent(skillName)}`
  );
  return res.data.response;
}

