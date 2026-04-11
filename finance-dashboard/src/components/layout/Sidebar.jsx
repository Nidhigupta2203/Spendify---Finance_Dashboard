import { FaChartPie, FaList, FaLightbulb } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("overview");

  const menu = [
    { id: "overview", label: "Overview", icon: <FaChartPie /> },
    { id: "transactions", label: "Transactions", icon: <FaList /> },
    { id: "insights", label: "Insights", icon: <FaLightbulb /> },
  ];

  return (
    <div className="h-screen bg-white dark:bg-[#0F172A] text-black dark:text-black dark:text-white p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-10 tracking-wide">Spendify</h1>

        {/* Navigation */}
        <p className="text-xs text-gray-400 mb-4">NAVIGATION</p>

        <ul className="space-y-2">
          {menu.map((item) => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                active === item.id
                  ? "bg-purple-600/20 text-purple-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <p className="text-xs text-gray-400 mb-2">ROLE</p>
        <div className="bg-gray-800 p-3 rounded-lg text-sm text-gray-200">
          Viewer
        </div>
      </div>
    </div>
  );
}
