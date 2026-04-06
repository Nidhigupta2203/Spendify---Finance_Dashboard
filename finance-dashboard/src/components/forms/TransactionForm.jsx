import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import Swal from "sweetalert2";

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
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    Swal.fire("Success", "Transaction added", "success");

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
      className="bg-white dark:bg-[#111827] p-6 rounded-2xl shadow space-y-5"
    >
      <h3 className="text-lg font-semibold text-black dark:text-white">Add Transaction</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="bg-[#0B1220] border border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg outline-none"
        />

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="bg-[#0B1220] border border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg outline-none"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="bg-[#0B1220] border border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="bg-[#0B1220] border border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg outline-none"
        />

        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="bg-[#0B1220] border border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-black dark:text-white px-5 py-2 rounded-lg w-full md:w-auto"
      >
        Add Transaction
      </button>
    </form>
  );
}
