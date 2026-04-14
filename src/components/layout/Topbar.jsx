import { useFinance } from "../../context/FinanceContext";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { role, setRole } = useFinance();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-2xl dark:bg-[#111827] border-b border-white/50 shadow-sm dark:shadow-none dark:border-gray-800 sticky top-0 z-10">
      <h2 className="font-semibold">Dashboard</h2>

      <div className="flex gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-indigo-50 text-indigo-900 border border-indigo-100 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-700 px-3 py-2 rounded-lg outline-none transition-all"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md shadow-indigo-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-none transition-all font-medium"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
