import SkillsQuadrant from "./SkillsQuadrant/SkillsQuadrant";
import GoalsQuadrandt from "./GoalsQuadrant/GoalsQuadrant";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function Dashboard(props) {
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [showAIGoals, setShowAIGoals] = useState(false);
  const [newGoals, setNewGoals] = useState({});
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div
      style={props.margins}
      className="grid grid-cols-2 grid-rows-2 h-screen"
    >
      <SkillsQuadrant
        setIsLoadingGoals={setIsLoadingGoals}
        setNewGoals={setNewGoals}
        showAIGoals={() => setShowAIGoals(true)}
        selectSkill={setSelectedSkill}
      />
      <GoalsQuadrandt
        showAIGoals={showAIGoals}
        isLoadingGoals={isLoadingGoals}
        setIsLoadingGoals={setIsLoadingGoals}
        newGoals={newGoals}
        setNewGoals={setNewGoals}
        closeAIGoals={() => setShowAIGoals(false)}
        selectedSkill={selectedSkill}
      />
      <div>Q3</div>
      <div>Q4</div>
    </div>
  );
}
