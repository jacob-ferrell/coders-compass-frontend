

export default function ProgressBar({ percent }) {

  const fillStyle = {
    width: `${percent}%`,
  };
  const roundedRight = percent === 100 ? '' : 'rounded-r-none'

  return (
    <div className="bg-gray-200 rounded-full h-3" >
      <div
        className={`h-full bg-emerald-400 rounded-full ${roundedRight}`}
        style={fillStyle}
      ></div>
    </div>
  );
}
