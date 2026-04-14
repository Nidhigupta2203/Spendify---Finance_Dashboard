import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import InsightsPage from "./pages/Insights";

export default function App() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0B1220] text-black dark:text-white">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </div>
  );
}
