import Layout from "./components/Layout";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

export default function App() {
  return (
    
    <Layout>
      {/* Dashboard */}
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <SummaryCards />
      <Charts />

      {/* Insights */}
      <h2 className="text-xl font-semibold">Insights</h2>
      <Insights />

      {/* Transactions */}
      <h2 className="text-xl font-semibold">Transactions</h2>
      <TransactionForm />
      <TransactionTable />
    </Layout>
    
  );
}
<div className="bg-red-500 p-4">Test</div>;