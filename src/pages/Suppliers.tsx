import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Layout/Sidebar";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

const Suppliers = () => {
  const { toast } = useToast();
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

  const handleAddSupplier = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add suppliers will be available soon.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Suppliers</h1>
            <p className="text-gray-600">Manage your supplier database</p>
          </div>
          <Button onClick={handleAddSupplier}>Add Supplier</Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <Input placeholder="Search suppliers..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Suppliers;