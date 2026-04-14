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
      className="bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-indigo-100/20 dark:shadow-none dark:border-gray-800 dark:bg-[#111827] p-6 rounded-3xl space-y-4"
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 text-gray-800 placeholder-gray-400"
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 text-gray-800 placeholder-gray-400"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 text-gray-800 placeholder-gray-400"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 text-gray-800 placeholder-gray-400"
      />

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none text-white font-medium py-3 rounded-xl transition-all">
        Add Transaction
      </button>
    </form>
  );
}
