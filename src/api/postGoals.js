import axiosInstance from "../axios";

export default async function postGoals(body) {

  console.log(body)
  const res = await axiosInstance.post(`skills/goal/`, body);

  return res;
}
