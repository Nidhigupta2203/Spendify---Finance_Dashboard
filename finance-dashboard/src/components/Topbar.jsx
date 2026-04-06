import { useFinance } from "../context/FinanceContext";

export default function Topbar() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex justify-between items-center p-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <p className="text-sm text-gray-400">
          Your financial summary at a glance
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
            className="bg-[#111827] text-white border border-gray-700 px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="bg-gray-800 px-3 py-2 rounded"
        >
          🌙
        </button>
      </div>
    </div>
  );
}
