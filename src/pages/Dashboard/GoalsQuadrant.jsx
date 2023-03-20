import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import LoadingAnimation from "./LoadingAnimation";
import getRandomPhrase from "../../utils/getRandomPhrase";
import NewGoalsTable from "./NewGoalsTable";
import postGoals from "../../api/postGoals";
import Modal from "../../components/Modal";

export default function GoalsQuadrandt({
  isLoadingGoals,
  setNewGoals,
  newGoals,
  showAIGoals,
}) {
  const queryClient = useQueryClient();
  const [checkedGoals, setCheckedGoals] = useState({});
  const [isAddGoalsModalOpen, setIsAddGoalsModalOpen] = useState(false);
  const [addGoalInput, setAddGoalInput] = useState("");

  useEffect(() => {
    if (newGoals?.goals?.length)
      setCheckedGoals(
        Object.fromEntries(newGoals?.goals?.map((g, i) => [i, true]))
      );
  }, [newGoals]);

  const handleSaveClick = async (e) => {
    const res = await postGoals({
      goals: newGoals.goals
        .filter((g, i) => checkedGoals[i])
        .map((g) => ({ description: g })),
      skill: newGoals.skillId,
    });
    queryClient.invalidateQueries("skills");
  };

  const handleAddGoalSubmit = async (e) => {
    e.preventDefault();
    setNewGoals((prev) => ({
      ...prev,
      goals: [...prev.goals, addGoalInput],
    }))
    setAddGoalInput('');
    setIsAddGoalsModalOpen(false);
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
                <input
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
                <button type="submit" className="bg-violet-500 w-full">
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
            goals={newGoals}
            setCheckedGoals={setCheckedGoals}
            checkedGoals={checkedGoals}
          />
        </>
      ) : null}
    </div>
  );
}
