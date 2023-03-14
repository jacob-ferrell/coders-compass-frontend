import axiosInstance from "../axios";

export default async function postSkill() {
    const res = await axiosInstance.post("skills/", {
      name: skillToLearn.name,
    });
    return res.data;
  }