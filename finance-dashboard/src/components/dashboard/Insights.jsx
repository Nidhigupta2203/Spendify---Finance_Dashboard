import { useFinance } from "../../context/FinanceContext";
import { FaLightbulb } from "react-icons/fa";

export default function Insights() {
  const context = useFinance();
  const transactions = context?.transactions || [];

  const expenses = transactions.filter((t) => t.type === "expense");

  // Top category
  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
  });

  let topCategory = "None";
  let max = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topCategory = key;
    }
  }

  // Current & previous month
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const prevMonth = prevDate.toISOString().slice(0, 7);

  let currentTotal = 0;
  let prevTotal = 0;

  expenses.forEach((t) => {
    if (!t.date) return;

    const month = t.date.slice(0, 7);

    if (month === currentMonth) currentTotal += Number(t.amount);
    if (month === prevMonth) prevTotal += Number(t.amount);
  });

  const change =
    prevTotal === 0
      ? 0
      : (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1);

  // Biggest expense
  let biggest = 0;
  let biggestTitle = "-";

  expenses.forEach((t) => {
    if (Number(t.amount) > biggest) {
      biggest = Number(t.amount);
      biggestTitle = t.title;
    }
  });

  // Avg daily
  const days = new Date().getDate();
  const avgDaily = days ? (currentTotal / days).toFixed(0) : 0;

  if (transactions.length === 0) {
    return (
      <div className="bg-[#111827] p-6 rounded-2xl text-gray-400">
        No insights available. Add transactions.
      </div>
    );
  }

  return (
    <div className="bg-[#111827] p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-5">
        <FaLightbulb className="text-yellow-400" />
        <h2 className="text-lg font-semibold">Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
        <Card title="Top Category" value={topCategory} />

        <Card title="This Month" value={`₹ ${currentTotal}`} />

        <Card
          title="Change"
          value={`${change}%`}
          color={change >= 0 ? "text-red-400" : "text-green-400"}
        />

        <Card title="Biggest Expense" value={`₹ ${biggest}`} />

        <Card title="Avg Daily" value={`₹ ${avgDaily}`} />

        <Card title="Transactions" value={transactions.length} />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-[#0B1220] p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h3 className={`mt-2 font-semibold ${color || "text-white"}`}>{value}</h3>
    </div>
  );
}
