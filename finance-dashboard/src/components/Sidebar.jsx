import { FaChartPie, FaList, FaLightbulb } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#0F172A] p-6 flex flex-col">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold mb-8">Zorvyn</h1>

        <p className="text-xs text-gray-400 mb-6">NAVIGATION</p>

        <ul className="space-y-3">
          <li className="bg-purple-600/20 text-purple-400 p-3 rounded-lg flex items-center gap-2 shadow-lg">
            <FaChartPie />
            Overview
          </li>

          <li className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer flex items-center gap-2">
            <FaList />
            Transactions
          </li>

          <li className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer flex items-center gap-2">
            <FaLightbulb />
            Insights
          </li>
        </ul>
      </div>

      {/* Role */}
      <div>
        <p className="text-xs text-gray-400 mb-2">ROLE</p>
        <div className="bg-gray-800 p-3 rounded-lg text-sm">Viewer</div>
      </div>
    </div>
  );
}
