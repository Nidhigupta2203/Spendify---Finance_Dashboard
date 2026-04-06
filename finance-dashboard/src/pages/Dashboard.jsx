import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import SummaryCards from "../components/dashboard/SummaryCards";
import Charts from "../components/dashboard/Charts";
import Insights from "../components/dashboard/Insights";
import TransactionForm from "../components/forms/TransactionForm";
import TransactionTable from "../components/dashboard/TransactionTable";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#0B1220] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          {/* Dashboard */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <SummaryCards />
            <div className="mt-6">
              <Charts />
            </div>
          </div>

          {/* Insights */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Insights</h2>
            <Insights />
          </div>

          {/* Transactions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            <TransactionForm />
            <div className="mt-6">
              <TransactionTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
