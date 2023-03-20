import SkillsQuadrant from "./SkillsQuadrant";
import GoalsQuadrandt from "./GoalsQuadrant";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function Dashboard(props) {
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [showAIGoals, setShowAIGoals] = useState(false);
  const [newGoals, setNewGoals] = useState({});

  return (
    <div
      style={props.margins}
      className="grid grid-cols-2 grid-rows-2 h-screen"
    >
      <SkillsQuadrant
        setIsLoadingGoals={setIsLoadingGoals}
        setNewGoals={setNewGoals}
        showAIGoals={() => setShowAIGoals(true)}
      />
      <GoalsQuadrandt
        showAIGoals={showAIGoals}
        isLoadingGoals={isLoadingGoals}
        setIsLoadingGoals={setIsLoadingGoals}
        newGoals={newGoals}
        setNewGoals={setNewGoals}
      />
      <div>Q3</div>
      <div>Q4</div>
    </div>
  );
}
