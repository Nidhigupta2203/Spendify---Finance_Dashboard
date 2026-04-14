import { useFinance } from "../../context/FinanceContext";
import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from "react-icons/fa";

export default function SummaryCards() {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const balance = income - expense;
  const savingsRate = income ? Math.round((balance / income) * 100) : 0;

  const format = (num) =>
    num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const cards = [
    {
      title: "Net Balance",
      value: `₹ ${format(balance)}`,
      icon: <FaWallet />,
      color: "from-purple-600/20 to-purple-800/20",
    },
    {
      title: "Total Income",
      value: `₹ ${format(income)}`,
      icon: <FaArrowUp />,
      color: "from-green-500/20 to-green-800/20",
    },
    {
      title: "Total Expense",
      value: `₹ ${format(expense)}`,
      icon: <FaArrowDown />,
      color: "from-red-500/20 to-red-800/20",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: <FaPiggyBank />,
      color: "from-yellow-500/20 to-yellow-800/20",
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-indigo-100/20 dark:shadow-none dark:border-gray-800 dark:bg-[#111827] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-1 rounded-3xl">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-md hover:scale-[1.02] transition`}
        >
          <div className="flex items-center justify-between">
            <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">{card.title}</p>
            <span className="text-xl text-slate-700 dark:text-gray-300">{card.icon}</span>
          </div>

          <h2 className="text-2xl font-bold mt-4 text-slate-800 dark:text-white">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}
