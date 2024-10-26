import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Layout/Sidebar";
import { CreateOrderDialog } from "@/components/PurchaseOrders/CreateOrderDialog";
import { Supplier } from "@/components/Suppliers/AddSupplierDialog";

interface PurchaseOrder {
  id: number;
  supplier: string;
  date: string;
  items: Array<{
    productName: string;
    type: "product" | "raw_material";
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "approved" | "delivered";
}

const PurchaseOrders = () => {
  const [suppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "ABC Supplies",
      contact: "John Doe",
      email: "john@abcsupplies.com",
      phone: "(555) 123-4567",
    },
    {
      id: 2,
      name: "XYZ Corporation",
      contact: "Jane Smith",
      email: "jane@xyzcorp.com",
      phone: "(555) 987-6543",
    },
  ]);

  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 1,
      supplier: "ABC Supplies",
      date: "2024-02-20",
      items: [
        { productName: "Raw Material A", type: "raw_material", quantity: 100, price: 52.50 }
      ],
      total: 5250.00,
      status: "pending",
    },
    {
      id: 2,
      supplier: "XYZ Corporation",
      date: "2024-02-19",
      items: [
        { productName: "Product X", type: "product", quantity: 50, price: 75.00 }
      ],
      total: 3750.00,
      status: "approved",
    },
  ]);

  const handleCreateOrder = (newOrder: PurchaseOrder) => {
    setOrders([...orders, newOrder]);
  };

  const getStatusColor = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "delivered":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Purchase Orders</h1>
            <p className="text-gray-600">Manage your purchase orders</p>
          </div>
          <CreateOrderDialog suppliers={suppliers} onCreateOrder={handleCreateOrder} />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Input placeholder="Search orders..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>PO-{order.id.toString().padStart(4, '0')}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default PurchaseOrders;