import { Activity, Briefcase, ChartBar, Clipboard, Database, Settings, User, Truck, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Activity, label: "Dashboard", path: "/" },
    { icon: Database, label: "Inventory", path: "/inventory" },
    { icon: Truck, label: "Suppliers", path: "/suppliers" },
    { icon: ShoppingCart, label: "Purchase Orders", path: "/purchase-orders" },
    { icon: Briefcase, label: "Sales", path: "/sales" },
    { icon: Clipboard, label: "Orders", path: "/orders" },
    { icon: ChartBar, label: "Reports", path: "/reports" },
    { icon: User, label: "Employees", path: "/employees" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">ERP System</h1>
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;