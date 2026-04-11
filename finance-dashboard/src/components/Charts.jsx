import { useFinance } from "../context/FinanceContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const { transactions } = useFinance();

  // Monthly data
  const monthly = {};

  transactions.forEach((t) => {
    if (!t.date) return;

    const month = t.date.slice(0, 7);

    if (!monthly[month]) monthly[month] = 0;

    monthly[month] +=
      t.type === "income" ? Number(t.amount) : -Number(t.amount);
  });

  const monthlyData = Object.keys(monthly).map((key) => ({
    month: key,
    value: monthly[key],
  }));

  // Category data
  const category = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      category[t.category] = (category[t.category] || 0) + Number(t.amount);
    }
  });

  const categoryData = Object.keys(category).map((key) => ({
    name: key,
    value: category[key],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Categories (FIXED) */}
      <div className="bg-[#111827] p-6 rounded-xl">
        <h3 className="mb-4 text-gray-300">Top Spending Categories</h3>

        {categoryData.map((item) => (
          <div key={item.name} className="mb-3">
            <p className="text-sm text-gray-400">{item.name}</p>

            <div className="w-full bg-gray-700 h-2 rounded mt-1">
              <div
                className="bg-pink-500 h-2 rounded"
                style={{
                  width: `${Math.min(
                    (item.value /
                      Math.max(...categoryData.map((c) => c.value))) *
                      100,
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-[#111827] p-6 rounded-xl shadow">
        <h3 className="mb-4 text-gray-300">Monthly Cash Flow</h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-[#111827] p-6 rounded-xl shadow md:col-span-2">
        <h3 className="mb-4 text-gray-300">Category Breakdown</h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
