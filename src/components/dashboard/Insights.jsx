import { useFinance } from "../../context/FinanceContext";

export default function Insights() {
  const context = useFinance();
  const transactions = context?.transactions || [];

  const expenses = transactions.filter((t) => t.type === "expense");

  let total = expenses.reduce((a, t) => a + Number(t.amount), 0);

  let biggest = Math.max(...expenses.map((t) => Number(t.amount)), 0);

  if (!transactions.length) {
    return <div>No insights available</div>;
  }

  return (
    <div className="bg-white dark:bg-[#111827] p-6 rounded-xl">
      <h2 className="mb-4">Insights</h2>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Expense" value={total} />
        <Card title="Biggest Expense" value={biggest} />
        <Card title="Transactions" value={transactions.length} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-100 dark:bg-[#0B1220] p-4 rounded-xl">
      <p>{title}</p>
      <h2>₹ {value}</h2>
    </div>
  );
}
