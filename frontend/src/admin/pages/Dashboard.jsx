import StatsCards from "../components/dashboard/StatsCards";
import SalesChart from "../components/dashboard/SalesChart";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import BestSellingItems from "../components/dashboard/BestSellingItems";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
          Dashboard
        </h1>
        <p className="font-body text-sm text-coffee-dark/50 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <BestSellingItems />
        </div>
      </div>

      <RecentOrdersTable />
    </div>
  );
};

export default Dashboard;
