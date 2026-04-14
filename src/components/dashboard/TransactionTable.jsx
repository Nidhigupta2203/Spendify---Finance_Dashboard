import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import Swal from "sweetalert2";

export default function TransactionTable() {
  const { transactions, deleteTransaction, role } = useFinance();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete transaction?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then((res) => {
      if (res.isConfirmed) deleteTransaction(id);
    });
  };

  let filtered = [...transactions];

  // Search
  filtered = filtered.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Filter
  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortOrder === "latest") return new Date(b.date) - new Date(a.date);
    if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "high") return b.amount - a.amount;
    if (sortOrder === "low") return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-indigo-100/20 dark:shadow-none dark:border-gray-800 dark:bg-[#111827] p-6 rounded-2xl">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white dark:bg-[#0B1220] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white px-4 py-3 rounded-xl w-full md:w-64 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 transition-all shadow-sm"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white dark:bg-[#0B1220] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-400 transition-all shadow-sm cursor-pointer"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-white dark:bg-[#0B1220] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-400 transition-all shadow-sm cursor-pointer"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="high">High Amount</option>
          <option value="low">Low Amount</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <th className="py-3">Date</th>
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
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-[#1F2937] transition text-gray-700 dark:text-gray-300"
              >
                <td className="py-3">{t.date}</td>
                <td>{t.title}</td>

                <td
                  className={
                    t.type === "income"
                      ? "text-green-400 font-medium"
                      : "text-red-400 font-medium"
                  }
                >
                  ₹ {Number(t.amount).toLocaleString("en-IN")}
                </td>

                <td>{t.category}</td>
                <td className="capitalize text-gray-500 dark:text-gray-400">{t.type}</td>

                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
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

      {/* Empty */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">No transactions found</p>
      )}
    </div>
  );
}
