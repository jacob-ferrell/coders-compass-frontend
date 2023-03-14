import SkillsTable from "./SkillsTable";
import SkillsDropdown from "./SkillsDropdown";
import Modal from "../../components/Modal";

export default function SkillsQuadrant(props) {
  return (
    <div className="p-3">
      <div className="flex justify-between mb-1">
        <SkillsDropdown />
        <Modal title="New Skill">
            
        </Modal>
      </div>
      <SkillsTable />
    </div>
  );
}
