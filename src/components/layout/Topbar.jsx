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
    <div className="flex justify-between items-center p-4 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800">
      <h2 className="font-semibold">Dashboard</h2>

      <div className="flex gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 bg-gray-800 text-white rounded"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
