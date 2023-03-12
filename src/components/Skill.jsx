import { useState } from "react";
import Goal from "./Goal";
import ProgressBar from "./ProgressBar";
import getPercentage from "../utils/getPercentage";
import axiosInstance from "../axios";

export default function Skill({ skill, setSelectedSkill }) {


  return (
    <div
      className="text-left pl-2 cursor-pointer"
      data-id={skill.id}
      onClick={(e) => setSelectedSkill(skill.id)}
    >
      <div className="flex">
        <div>{skill.name}</div>
        {!!skill.goals?.length ? (
          <ProgressBar percent={getPercentage(skill.goals)} />
        ) : null}
      </div>
    </div>
  );
}
