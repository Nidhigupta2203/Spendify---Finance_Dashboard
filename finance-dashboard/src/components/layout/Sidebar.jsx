import { FaChartPie, FaList, FaLightbulb } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";

export default function Sidebar() {
  const { role } = useFinance(); // 👈 get role from context

  const menu = [
    { path: "/", label: "Overview", icon: <FaChartPie /> },
    { path: "/transactions", label: "Transactions", icon: <FaList /> },
    { path: "/insights", label: "Insights", icon: <FaLightbulb /> },
  ];

  return (
    <div className="min-h-screen w-64 bg-[#0B1220] text-white flex flex-col justify-between border-r border-gray-800">
      {/* Top */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Spendify</h1>

        <p className="text-xs text-gray-400 mb-3">NAVIGATION</p>

        <ul className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Bottom */}
      <div className="p-6">
        <p className="text-xs text-gray-400 mb-2">ROLE</p>

        <div className="bg-gray-800 px-4 py-3 rounded-xl text-sm font-medium text-center">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Viewer"}
        </div>
      </div>
    </div>
  );
}
