import axiosInstance from "../axios";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
export default function Goal({ goalID, skillID, handleChange, selectedGoals }) {
  const queryClient = useQueryClient();
  const skills = useQuery('skills');
  const skill = skills.data.find(s => s.id === skillID);
  const goal = skill.goals.find(g => g.id === goalID)
  const [checked, setChecked] = useState(goal.complete);
  const [subGoals, setSubGoals] = useState([]);

  useEffect(() => {

  }, [goal.complete])

  const mutation = useMutation(editGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries("skills");
      setChecked((prev) => !prev);
    },
  });

  async function editGoal() {
    const res = await axiosInstance.put("skills/goal/", {
      ...goal,
      complete: !goal.complete,
    });
    return res;
  }

  async function getSubGoals() {
    const res = await axiosInstance.get(
      `chatgpt/?skill=${encodeURIComponent(skill)}&goal=${encodeURIComponent(
        goal.description
      )}`
    );
    console.log(res.data);
    setSubGoals(res?.data?.response.map((goal) => ({ description: goal })));
  }

  return (
    <>
      <div className="flex gap-5">
      <input
            type="checkbox"
            value={goal.id}
            checked={selectedGoals[goal.id]}
            onChange={handleChange}
            multiple={true}
          />
        <div>{goal.description}</div>
        <input type="checkbox" checked={checked} onChange={mutation.mutate} />
        <button onClick={() => setSubGoals(getSubGoals())}>
          Create Sub-Goals
        </button>
      </div>
      {!!subGoals.length ? (
        <div className={`${goal.id}-subgoal-container pl-4`}>
          {subGoals?.map((goal) => (
            <div>{goal.description}</div>
          ))}
        </div>
      ) : null}
    </>
  );
}
