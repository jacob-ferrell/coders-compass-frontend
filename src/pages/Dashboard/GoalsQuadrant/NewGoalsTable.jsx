import { useEffect, useState } from "react";

export default function NewGoalsTable({
  goals,
  checkedGoals,
  setCheckedGoals,
  isAIGoals,
  skillName,
}) {
  const [allChecked, setAllChecked] = useState(true);

  useEffect(() => {
    setAllChecked(Object.values(checkedGoals).every((g) => g));
  }, [checkedGoals]);

  const handleSelectAllChange = (e) => {
    const newState = !allChecked;
    setCheckedGoals(
      Object.fromEntries(goals.map((g, i) => [i, newState]))
    );
  };

  const handleGoalCheckChange = (i) => {
    setCheckedGoals((prev) => ({ ...prev, [i]: !checkedGoals[i] }));
    setAllChecked(
      Object.values({ ...checkedGoals, [i]: !checkedGoals[i] }).every((g) => g)
    );
  };

  const rows = goals?.map((g, i) => (
    <tr
      key={i}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="w-4 p-4">
        {checkedGoals.hasOwnProperty(i) && (
          <input
            onChange={() => handleGoalCheckChange(i)}
            checked={checkedGoals[i]}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        )}
        <label className="sr-only">checkbox</label>
      </td>
      <td className="px-6">{g}</td>
    </tr>
  ));

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-sm">
      <thead className="text-xs text-gray-700 uppercase bg-violet-300 text-gray-900 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4">
            <input
              checked={allChecked}
              onChange={handleSelectAllChange}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="sr-only">checkbox</label>
          </th>
          <th scope="col" className="px-6 py-3">
            AI Generated Goals for learning {skillName}
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
