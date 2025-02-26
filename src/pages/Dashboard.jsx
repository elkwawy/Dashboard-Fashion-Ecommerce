import { DashboardStats } from "../components/dashboard/DashboardStats";
import SalesChart from "../components/dashboard/SalesChart";
export default function Dashboard() {
  return (
    <div className="space-y-7">
      <DashboardStats />
      <SalesChart />
    </div>
  );
}
