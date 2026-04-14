import TransactionForm from "../components/forms/TransactionForm";
import TransactionTable from "../components/dashboard/TransactionTable";

export default function Transactions() {
  return (
    <div className="p-6 space-y-6">
      <TransactionForm />
      <TransactionTable />
    </div>
  );
}
