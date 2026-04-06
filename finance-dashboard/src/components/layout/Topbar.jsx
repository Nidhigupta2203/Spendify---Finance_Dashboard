import { useFinance } from "../../context/FinanceContext";
import { FaSearch, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { role, setRole } = useFinance();
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Toggle theme
  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-gray-200 dark:border-gray-800">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-black dark:text-white dark:text-black dark:text-white">
          Dashboard
        </h2>
        <p className="text-sm text-gray-400">Financial summary overview</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center bg-white dark:bg-[#111827] px-3 py-2 rounded-lg border border-gray-700">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-black dark:text-white placeholder-gray-500"
          />
        </div>

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white dark:bg-[#111827] text-black dark:text-white border border-gray-700 px-3 py-2 rounded-lg text-sm"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Theme toggle */}
        <button
          onClick={toggleDark}
          className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 bg-white dark:bg-[#111827] px-3 py-2 rounded-lg border border-gray-700 hover:bg-gray-700">
          <FaUserCircle className="text-xl text-gray-400" />
          <span className="text-sm text-gray-300 hidden md:block">User</span>
        </button>
      </div>
    </div>
  );
}
