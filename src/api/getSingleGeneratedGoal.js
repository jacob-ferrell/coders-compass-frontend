import axiosInstance from "../axios";

export default async function getSingleGeneratedGoal(body) {
  const res = await axiosInstance.post(`chatgpt/`, body);
  return res.data.response;
}
