import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import Goal from "../../components/Goal";
import Dropdown from "../../components/Dropdown";
import axiosInstance from "../../axios";

export default function SkillPage({ skillID }) {
  const skills = useQuery('skills');
  const skill = skills.data.find(s => s.id === skillID);
  const queryClient = useQueryClient();
  const [selectedGoals, setSelectedGoals] = useState(
    Object.fromEntries(skill.goals.map((goal) => [goal.id, false]))
  );

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
      console.log('success');
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

  return (
    <>
      <div className="flex justify-between">
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
      {skill.goals?.map((goal, i) => (
        <div key={`goal${i}`}>
          <Goal
            selectedGoals={selectedGoals}
            goalID={goal.id}
            skillID={skill.id}
            handleChange={handleCheckClick}
          />
        </div>
      ))}
    </>
  );
}
