

export default function ProgressBar({ goals, getGoals, percent }) {

  const fillStyle = {
    width: `${percent}%`,
  };

  return (
    <div className="w-full bg-gray-100 rounded-full">
      <div
        className={`h-full bg-green-500 rounded-full rounded-r-none`}
        style={fillStyle}
      ></div>
    </div>
  );
}
