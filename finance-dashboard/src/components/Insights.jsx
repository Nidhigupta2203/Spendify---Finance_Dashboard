import { useFinance } from "../context/FinanceContext";

export default function Insights() {
  const { transactions } = useFinance();

  // Top category
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
    }
  });

  let topCategory = "None";
  let max = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topCategory = key;
    }
  }

  // Monthly comparison
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);

  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const prevMonth = prevDate.toISOString().slice(0, 7);

  let currentTotal = 0;
  let prevTotal = 0;

  transactions.forEach((t) => {
    if (!t.date || t.type !== "expense") return;

    const month = t.date.slice(0, 7);

    if (month === currentMonth) currentTotal += Number(t.amount);
    if (month === prevMonth) prevTotal += Number(t.amount);
  });

  const change =
    prevTotal === 0
      ? 0
      : (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Insights
      </h2>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Top category:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {topCategory}
          </span>
        </p>

        <p>
          This month expense:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹ {currentTotal}
          </span>
        </p>

        <p>
          Change from last month:{" "}
          <span
            className={`font-semibold ${
              change >= 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {change}%
          </span>
        </p>
      </div>
    </div>
  );
}
