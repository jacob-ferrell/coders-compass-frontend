import axiosInstance from "../axios";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
export default function Goal({
  skill,
  goal,
  position,
  handleChange,
  selectedGoals,
}) {
  const queryClient = useQueryClient();
  const completed = selectedGoals[goal.id];
  const [subGoals, setSubGoals] = useState([]);

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
      <li
        className="flex gap-5 items-center"
      >
        <input
          type="checkbox"
          value={goal.id}
          checked={selectedGoals[goal.id]}
          onChange={handleChange}
          multiple={true}
        />
        <div className={goal.complete ? "complete" : ""}>
          {goal.description}
        </div>
      </li>
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
