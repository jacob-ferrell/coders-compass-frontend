import axiosInstance from "../axios";

export default async function getGoals(skill = null) {
  let queryParam = "";
  if (skill) {
    queryParam = `?skill=${encodeURIComponent(skill)}`;
  }
  const res = await axiosInstance.get(`skills/goal/${queryParam}`);
  return res.data;
}
