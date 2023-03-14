import './SkillPage.css';
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import Goal from "../../components/Goal";
import Dropdown from "../../components/Dropdown";
import axiosInstance from "../../axios";

export default function SkillPage({skill, style}) {
  let { id } = useParams();
  const skills = useQuery("skills");
  const queryClient = useQueryClient();
  const [selectedGoals, setSelectedGoals] = useState(clearGoals);

  function handleCheckClick(e) {
    setSelectedGoals((prev) => ({
      ...prev,
      [e.target.value]: !prev[e.target.value],
    }));
  }

  async function markGoals(complete) {
    const goals = skill.goals
      .filter((goal) => selectedGoals[goal.id])
      .map((goal) => ({ ...goal, complete }));
    const res = await axiosInstance.put("skills/goal/", {
      goals,
    });
    return res;
  }

  const markGoalsMutation = useMutation(markGoals, {
    optimisticUpdater: (cache, { goals, complete }) => {
      const queryKey = ["skills", skill.id];
      const skillData = cache.getQueryData(queryKey);
      const updatedGoals = skillData.goals.map((goal) => {
        if (goals.some((g) => g.id === goal.id)) {
          return { ...goal, complete };
        }
        return goal;
      });
      cache.setQueryData(queryKey, { ...skillData, goals: updatedGoals });
    },
    onSuccess: () => {
      setSelectedGoals(clearGoals());
      queryClient.invalidateQueries("skills");
    },
  });

  async function deleteGoals() {
    const goals = skill.goals
      .filter((goal) => selectedGoals[goal.id])
      .map((goal) => goal.id);
    const res = await axiosInstance.delete(
      `skills/goal?pk_ids=${goals.join(",")}`
    );
    return res;
  }

  function clearGoals() {
    return Object.fromEntries(skill.goals.map((goal) => [goal.id, false]));
  }

  return (
    <div style={style} className="flex flex-col items-center max-w-screen max-h-screen">
      <div className="flex justify-between w-100">
        <h1>{skill.name}</h1>
        <div>
          {!Object.keys(selectedGoals).every((goal) => !selectedGoals[goal]) ? (
            <Dropdown
              markGoals={markGoalsMutation.mutate}
              deleteGoals={deleteGoals}
            />
          ) : null}
        </div>
      </div>
      <ul className="goals-list flex flex-col gap-4 flex-wrap">
        {skill.goals
          ?.sort((a, b) => a.complete - b.complete)
          .map((goal, i) => (
            <Goal
              key={`goal${i}`}
              selectedGoals={selectedGoals}
              goal={goal}
              skill={skill}
              handleChange={handleCheckClick}
              position={i}
            />
          ))}
      </ul>
    </div>
  );
}
