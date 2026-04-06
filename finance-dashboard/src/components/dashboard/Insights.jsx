import { useFinance } from "../../context/FinanceContext";
import { FaLightbulb } from "react-icons/fa";

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

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl text-gray-400">
        No insights available. Add transactions.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FaLightbulb className="text-yellow-400" />
        <h2 className="text-lg font-semibold text-black dark:text-white">Insights</h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        {/* Top Category */}
        <div className="bg-[#0B1220] p-4 rounded-xl">
          <p className="text-gray-400">Top Category</p>
          <h3 className="text-black dark:text-white font-semibold mt-2">{topCategory}</h3>
        </div>

        {/* Current Month */}
        <div className="bg-[#0B1220] p-4 rounded-xl">
          <p className="text-gray-400">This Month</p>
          <h3 className="text-black dark:text-white font-semibold mt-2">
            ₹ {currentTotal.toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Change */}
        <div className="bg-[#0B1220] p-4 rounded-xl">
          <p className="text-gray-400">Change</p>
          <h3
            className={`font-semibold mt-2 ${
              change >= 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {change}%
          </h3>
        </div>
      </div>
    </div>
  );
}
