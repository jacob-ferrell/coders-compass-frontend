import { useQuery, useQueryClient } from "react-query";
import ProgressBar from "../../components/ProgressBar";
import getPercentage from "../../utils/getPercentage";
import getSkills from "../../api/getSkills";

export default function SkillsTable(props) {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("skills", getSkills);

  const rows = !isLoading
    ? data?.map((skill, i) => (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          key={"skill-row-" + i}
        >
          <td className="w-4 p-4">
            <input
              id="checkbox-all-search"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checkbox-all-search" class="sr-only">
              checkbox
            </label>
          </td>
          <td className="px-6 py-4">{skill.name}</td>
          <td>
            <ProgressBar percent={getPercentage(skill.goals)} />
          </td>
          <td className="px-6 py-4">{skill.created_at.slice(5, 10)}</td>
          <td className="text-center">{skill.goals.length}</td>
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
