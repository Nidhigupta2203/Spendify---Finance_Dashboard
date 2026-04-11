import { useFinance } from "../context/FinanceContext";

export default function SummaryCards() {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 rounded-xl">
        <p className="text-gray-400">Net Balance</p>
        <h2 className="text-2xl font-bold mt-2">₹ {balance}</h2>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-green-800/20 p-6 rounded-xl">
        <p className="text-gray-400">Total Income</p>
        <h2 className="text-2xl font-bold mt-2">₹ {income}</h2>
      </div>

      <div className="bg-gradient-to-br from-red-500/20 to-red-800/20 p-6 rounded-xl">
        <p className="text-gray-400">Total Expense</p>
        <h2 className="text-2xl font-bold mt-2">₹ {expense}</h2>
      </div>

      <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-800/20 p-6 rounded-xl">
        <p className="text-gray-400">Savings Rate</p>
        <h2 className="text-2xl font-bold mt-2">
          {income ? Math.round((balance / income) * 100) : 0}%
        </h2>
      </div>
    </div>
  );
}
