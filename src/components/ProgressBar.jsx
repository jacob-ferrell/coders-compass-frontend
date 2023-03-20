

export default function ProgressBar({ percent }) {

  const fillStyle = {
    width: `${percent}%`,
  };

  return (
    <div className="bg-gray-100 rounded-full h-3" >
      <div
        className={`h-full bg-emerald-400 rounded-full rounded-r-none`}
        style={fillStyle}
      ></div>
    </div>
  );
}
