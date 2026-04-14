import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";

export default function TransactionForm() {
  const { addTransaction } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    addTransaction(form);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] p-4 rounded-xl space-y-3"
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full p-2 rounded bg-gray-800 text-white"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />

      <button className="bg-purple-600 px-4 py-2 rounded text-white">
        Add Transaction
      </button>
    </form>
  );
}
