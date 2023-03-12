export default function getPercentage(goals) {
  return Math.round(
    (goals.filter((goal) => goal.complete).length / goals.length) * 100
  );
}
