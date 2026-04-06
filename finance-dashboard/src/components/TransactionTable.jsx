import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import Swal from "sweetalert2";

export default function TransactionTable() {
  const { transactions, deleteTransaction, role } = useFinance();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      text: "This cannot be undone",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) deleteTransaction(id);
    });
  };

  let filtered = [...transactions];

  // search
  filtered = filtered.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  // filter
  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  // sort
  filtered.sort((a, b) => {
    if (sortOrder === "latest") return new Date(b.date) - new Date(a.date);
    if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "high") return b.amount - a.amount;
    if (sortOrder === "low") return a.amount - b.amount;
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-auto"
        />

        <select
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  className="bg-[#111827] text-white border border-gray-700 px-3 py-2 rounded"
>
  <option className="text-black" value="all">All</option>
  <option className="text-black" value="income">Income</option>
  <option className="text-black" value="expense">Expense</option>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-[#111827] text-white border border-gray-700 px-3 py-2 rounded"
        >
          <option className="text-black" value="latest">
            Latest
          </option>
          <option className="text-black" value="oldest">
            Oldest
          </option>
          <option className="text-black" value="high">
            High Amount
          </option>
          <option className="text-black" value="low">
            Low Amount
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-500 dark:text-gray-300">
              <th className="py-2">Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="py-2">{t.date}</td>
                <td>{t.title}</td>

                <td
                  className={
                    t.type === "income"
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  ₹ {t.amount}
                </td>

                <td>{t.category}</td>
                <td className="capitalize">{t.type}</td>

                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-6">No transactions found</p>
      )}
    </div>
  );
}
