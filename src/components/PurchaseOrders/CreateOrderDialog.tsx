import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Supplier } from "@/components/Suppliers/AddSupplierDialog";

interface Product {
  id: number;
  name: string;
  type: "product" | "raw_material";
  quantity: number;
  price: number;
}

interface CreateOrderDialogProps {
  suppliers: Supplier[];
  onCreateOrder: (order: any) => void;
}

export const CreateOrderDialog = ({ suppliers, onCreateOrder }: CreateOrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    supplierId: "",
    items: [{ productName: "", type: "product", quantity: 1, price: 0 }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.supplierId || formData.items.some(item => !item.productName)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const order = {
      id: Date.now(),
      supplier: suppliers.find(s => s.id.toString() === formData.supplierId)?.name,
      date: new Date().toISOString().split('T')[0],
      items: formData.items,
      total,
      status: "pending",
    };

    onCreateOrder(order);
    setFormData({ supplierId: "", items: [{ productName: "", type: "product", quantity: 1, price: 0 }] });
    setOpen(false);
    toast({
      title: "Success",
      description: "Purchase order created successfully",
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productName: "", type: "product", quantity: 1, price: 0 }],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Supplier</Label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) =>
                setFormData({ ...formData, supplierId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium">Item {index + 1}</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={item.productName}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].productName = e.target.value;
                      setFormData({ ...formData, items: newItems });
                    }}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={item.type}
                    onValueChange={(value: "product" | "raw_material") => {
                      const newItems = [...formData.items];
                      newItems[index].type = value;
                      setFormData({ ...formData, items: newItems });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="raw_material">Raw Material</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].quantity = parseInt(e.target.value);
                      setFormData({ ...formData, items: newItems });
                    }}
                  />
                </div>
                <div>
                  <Label>Price per unit</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].price = parseFloat(e.target.value);
                      setFormData({ ...formData, items: newItems });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addItem}>
            Add Another Item
          </Button>

          <Button type="submit" className="w-full">
            Create Purchase Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};