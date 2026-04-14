import SummaryCards from "../components/dashboard/SummaryCards";
import Charts from "../components/dashboard/Charts";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <SummaryCards />
      <Charts />
    </div>
  );
}
