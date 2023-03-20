import SkillsTable from "./SkillsTable";
import SkillsDropdown from "./SkillsDropdown";
import Modal from "../../components/Modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import postSkill from "../../api/postSkill";

export default function SkillsQuadrant({ setIsLoadingGoals, setNewGoals, showAIGoals }) {
  const queryClient = useQueryClient();
  const skills = useQuery("skills");
  const [skillToLearn, setSkillToLearn] = useState("");
  const [checkedSkills, setCheckedSkills] = useState({});
  const [isNewSkillModalOpen, setIsNewSkillModalOpen] = useState(false);

  const { mutate } = useMutation(postSkill, {
    onMutate: async (newSkill) => {
      await queryClient.cancelQueries("skills");
      const prev = queryClient.getQueryData("skills");
      queryClient.setQueryData("skills", (prevData) => [...prevData, newSkill]);
      return { prev };
    },
    onError: (error, variables, prev) => {
      alert(error);
      queryClient.setQueryData("skills", prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("skills");
      setIsNewSkillModalOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    mutate({ name: skillToLearn, created_at: now, updated_at: now, goals: [] });
  };

  return (
    <div className="p-3">
      <div className="flex justify-between mb-1">
        <SkillsDropdown
          disabled={!Object.values(checkedSkills).some((s) => s)}
        />
        <Modal
          title="New Skill"
          openModal={() => setIsNewSkillModalOpen(true)}
          closeModal={() => setIsNewSkillModalOpen(false)}
          isOpen={isNewSkillModalOpen}
        >
          <form className="flex flex-col text-gray-600" onSubmit={handleSubmit}>
            <label htmlFor="skill">Skill To Learn</label>
            <input
              onChange={(e) => setSkillToLearn(e.target.value)}
              className=""
              type="text"
              name="skill"
            />
            <button className="bg-purple-500" type="submit">
              Submit
            </button>
          </form>
        </Modal>
      </div>
      <SkillsTable
        setIsLoadingGoals={setIsLoadingGoals}
        setCheckedSkills={setCheckedSkills}
        setNewGoals={setNewGoals}
        showAIGoals={showAIGoals}
      />
    </div>
  );
}
