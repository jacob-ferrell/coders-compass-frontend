import axiosInstance from "../axios";

export default async function postSkill(skill) {
    const res = await axiosInstance.post("skills/", skill);
    return res.data;
  }