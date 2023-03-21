import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import LoadingAnimation from "./LoadingAnimation";
import getRandomPhrase from "../../../utils/getRandomPhrase";
import GoalsTable from "./GoalsTable";
import NewGoalsTable from "./NewGoalsTable";
import postGoals from "../../../api/postGoals";
import Modal from "../../../components/Modal";
import getSingleGeneratedGoal from "../../../api/getSingleGeneratedGoal";
import GoalsDropdown from "./GoalsDropdown";
import axiosInstance from "../../../axios";

export default function GoalsQuadrandt({
  isLoadingGoals,
  setNewGoals,
  newGoals,
  showAIGoals,
  closeAIGoals,
  selectedSkill,
}) {
  const queryClient = useQueryClient();
  const [checkedGoals, setCheckedGoals] = useState({});
  const [isAddGoalsModalOpen, setIsAddGoalsModalOpen] = useState(false);
  const [addGoalInput, setAddGoalInput] = useState("");

  useEffect(() => {
    if (showAIGoals && newGoals?.goals?.length) {
      return setAllCheckedGoals(newGoals?.goals, true);
    }
    if (selectedSkill?.goals?.length)
      setAllCheckedGoals(selectedSkill?.goals, false);
  }, [showAIGoals, newGoals, selectedSkill]);

  function setAllCheckedGoals(goals, value) {
    setCheckedGoals(
      Object.fromEntries(
        goals.map((g, i) => (value ? [i, value] : [g.id, value]))
      )
    );
  }

  async function markGoals(complete) {
    const goals = selectedSkill.goals
      .filter((goal) => checkedGoals[goal.id])
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
      setAllCheckedGoals(selectedSkill?.goals, false);
      queryClient.invalidateQueries("skills");
    },
  });

  async function deleteGoals() {
    const goals = skill.goals
      .filter((goal) => checkedGoals[goal.id])
      .map((goal) => goal.id);
    const res = await axiosInstance.delete(
      `skills/goal?pk_ids=${goals.join(",")}`
    );
    return res;
  }

  const handleSaveClick = async (e) => {
    const res = await postGoals({
      goals: newGoals.goals
        .filter((g, i) => checkedGoals[i])
        .map((g) => ({ description: g })),
      skill: newGoals.skillId,
    });
    queryClient.invalidateQueries("skills");
    closeAIGoals();
  };

  const handleAddGoalSubmit = async (e) => {
    e.preventDefault();
    setNewGoals((prev) => ({
      ...prev,
      goals: [...prev.goals, addGoalInput],
    }));
    setAddGoalInput("");
    setIsAddGoalsModalOpen(false);
  };

  const handleGenerateGoalClick = async (e) => {
    e.preventDefault();
    const body = {
      other_goals: newGoals.goals,
      skill_name: newGoals.skillName,
    };
    const newGoal = await getSingleGeneratedGoal(body);
    console.log(newGoal + "poops");
    setAddGoalInput(newGoal);
    /* setNewGoals((prev) => ({
      ...prev,
      goals: [...prev.goals, addGoalInput],
    })) */
  };

  return (
    <div className="p-3">
      {isLoadingGoals ? (
        <LoadingAnimation phrase={getRandomPhrase()} />
      ) : showAIGoals ? (
        <>
          <div className="mb-1 flex justify-between">
            <button
              disabled={Object.values(checkedGoals).every((g) => !g)}
              onClick={handleSaveClick}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Save Goals
            </button>
            <Modal
              title="Add Goal"
              openModal={() => setIsAddGoalsModalOpen(true)}
              closeModal={() => setIsAddGoalsModalOpen(false)}
              isOpen={isAddGoalsModalOpen}
            >
              <form
                onSubmit={handleAddGoalSubmit}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-center">
                  Enter a custom goal, or click generate goal to retrieve
                  another AI generated goal. There's a chance the AI generated
                  goal may be similar to an existing goal.
                </p>
                <textarea
                  rows="5"
                  className="w-full"
                  autoFocus
                  type="text"
                  defaultValue={addGoalInput}
                  onChange={(e) => setAddGoalInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!addGoalInput}
                  className="bg-violet-500 w-full"
                >
                  Add Goal
                </button>
                <button
                  className="bg-violet-500 w-full"
                  onClick={handleGenerateGoalClick}
                >
                  Generate Goal
                </button>
              </form>
            </Modal>
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Regenerate
            </button>
          </div>
          <NewGoalsTable
            goals={newGoals.goals}
            skillName={newGoals.skillName}
            setCheckedGoals={setCheckedGoals}
            checkedGoals={checkedGoals}
          />
        </>
      ) : selectedSkill ? (
        <>
          <GoalsDropdown
            markGoals={markGoalsMutation.mutate}
            deleteGoals={deleteGoals}
            disabled={Object.values(checkedGoals).every((g) => !g)}
          />
          <GoalsTable
            skill={selectedSkill}
            setCheckedGoals={setCheckedGoals}
            checkedGoals={checkedGoals}
          />
        </>
      ) : null}
    </div>
  );
}
