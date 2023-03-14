export default function getPercentage(goals) {
  if (!goals.length) return 0;
  return Math.round(
    (goals.filter((goal) => goal.complete).length / goals.length) * 100
  );
}
