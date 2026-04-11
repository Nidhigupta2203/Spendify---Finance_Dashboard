import { useFinance } from "../../context/FinanceContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Charts() {
  const context = useFinance();
const transactions = context?.transactions || [];

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

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#ec4899"];

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111827] p-6 rounded-xl text-center text-gray-400">
        No data available. Add transactions to see charts.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow">
        <h3 className="mb-4 text-gray-300 font-medium">
          Top Spending Categories
        </h3>

        <div className="space-y-4">
          {categoryData.map((item, index) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{item.name}</span>
                <span>₹ {item.value}</span>
              </div>

              <div className="w-full bg-gray-700 h-2 rounded mt-1">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${Math.min(
                      (item.value /
                        Math.max(...categoryData.map((c) => c.value), 1)) *
                        100,
                      100,
                    )}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow">
        <h3 className="mb-4 text-gray-300 font-medium">Monthly Cash Flow</h3>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow lg:col-span-2">
        <h3 className="mb-4 text-gray-300 font-medium">Category Breakdown</h3>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={300}>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
