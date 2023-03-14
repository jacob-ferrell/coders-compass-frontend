import SkillsQuadrant from "./SkillsQuadrant";
import Modal from "../../components/Modal";

export default function Dashboard(props) {

  return (
    <div style={props.margins} className="grid grid-cols-2 grid-rows-2 h-screen">
      <SkillsQuadrant />
      <div>Q2</div>
      <div>Q3</div>
      <div>Q4</div>
    </div>
  );
}
