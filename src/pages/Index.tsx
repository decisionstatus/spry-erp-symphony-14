import { Activity, DollarSign, Package, Users } from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import MetricCard from "@/components/Dashboard/MetricCard";
import RevenueChart from "@/components/Dashboard/RevenueChart";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back to your ERP dashboard</p>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Active Orders"
            value="126"
            description="12 orders pending"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Active Users"
            value="2,345"
            description="+180 this week"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Activity Rate"
            value="92%"
            description="+4.5% from last week"
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <RevenueChart />
      </main>
    </div>
  );
};

export default Index;