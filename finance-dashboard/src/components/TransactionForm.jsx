import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function TransactionForm() {
  const { addTransaction, role } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  if (role === "viewer") return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

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
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Add Transaction
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border rounded px-3 py-2 w-full"
        />

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="border rounded px-3 py-2 w-full"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded px-3 py-2 w-full"
        />

        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="border rounded px-3 py-2 w-full md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
      >
        Add Transaction
      </button>
    </form>
  );
}
