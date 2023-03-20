import { useQuery, useQueryClient } from "react-query";
import ProgressBar from "../../../components/ProgressBar";
import getPercentage from "../../../utils/getPercentage";
import getSkills from "../../../api/getSkills";
import getGeneratedGoals from "../../../api/getGeneratedGoals";

export default function SkillsTable({
  setCheckedSkills,
  setIsLoadingGoals,
  setNewGoals,
  showAIGoals,
  selectSkill
}) {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("skills", getSkills);

  const handleCheckboxChange = (skillId, checked) => {
    setCheckedSkills((prev) => ({
      ...prev,
      [skillId]: checked,
    }));
  };

  const handleSkillClick = (e, skill) => {
    e.preventDefault();
    selectSkill(skill);
  };

  const rows = !isLoading
    ? data?.map((skill, i) => (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          key={"skill-row-" + i}
        >
          <td className="w-4 p-4">
            <input
              onChange={(e) => handleCheckboxChange(skill.id, e.target.checked)}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="sr-only">checkbox</label>
          </td>
          <td>
            <a
              className="text-violet-800"
              onClick={(e) => handleSkillClick(e, skill)}
              href="#"
            >
              {skill.name}
            </a>
          </td>
          <td>
            {!!skill.goals.length ? (
              <ProgressBar percent={getPercentage(skill.goals)} />
            ) : (
              <a
                className="cursor-pointer w-full"
                onClick={async (e) => {
                  e.preventDefault();
                  showAIGoals();
                  setIsLoadingGoals(true);
                  const goals = await getGeneratedGoals(skill.name);
                  setIsLoadingGoals(false);
                  setNewGoals({
                    skillId: skill.id,
                    skillName: skill.name,
                    goals,
                  });
                }}
              >
                Generate Goals
              </a>
            )}
          </td>
          <td className="px-6 py-4">{skill.created_at.slice(5, 10)}</td>
          <td className="text-center">
            {skill.goals.filter((g) => !g.complete).length}
          </td>
        </tr>
      ))
    : null;

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-violet-300 text-gray-900 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4"></th>
          <th scope="col" className="px-6 py-3">
            Skill
          </th>
          <th scope="col" className="px-6 py-3">
            Progress
          </th>
          <th scope="col" className="px-6 py-3">
            Started
          </th>
          <th scope="col" className="py-3 text-center">
            Goals To Complete
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
