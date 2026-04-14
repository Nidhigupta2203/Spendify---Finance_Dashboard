import { FaChartPie, FaList, FaLightbulb } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";

export default function Sidebar() {
  const { role } = useFinance();

  const menu = [
    { path: "/", label: "Overview", icon: <FaChartPie /> },
    { path: "/transactions", label: "Transactions", icon: <FaList /> },
    { path: "/insights", label: "Insights", icon: <FaLightbulb /> },
  ];

  return (
    <div className="min-h-screen w-64 bg-white/60 backdrop-blur-2xl dark:bg-[#0B1220] border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:border-gray-800 dark:shadow-none flex flex-col justify-between z-10 relative">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Spendify</h1>

        <p className="text-xs text-gray-400 mb-3">NAVIGATION</p>

        <ul className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <p className="text-xs text-gray-400 mb-2">ROLE</p>
        <div className="bg-gray-200 dark:bg-gray-800 px-4 py-3 rounded-xl text-sm text-center">
          {role}
        </div>
      </div>
    </div>
  );
}
