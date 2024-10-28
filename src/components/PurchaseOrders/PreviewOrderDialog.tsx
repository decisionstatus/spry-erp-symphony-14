import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewOrderDialogProps {
  order: {
    id: number;
    supplier: string;
    date: string;
    items: Array<{
      productName: string;
      type: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    status: string;
  };
}

export const PreviewOrderDialog = ({ order }: PreviewOrderDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Purchase Order Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Supplier</p>
              <p>{order.supplier}</p>
            </div>
            <div>
              <p className="font-semibold">Date</p>
              <p>{order.date}</p>
            </div>
          </div>
          
          <div>
            <p className="font-semibold mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="border p-2 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <p><span className="font-medium">Name:</span> {item.productName}</p>
                    <p><span className="font-medium">Type:</span> {item.type}</p>
                    <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                    <p><span className="font-medium">Price:</span> ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <p className="font-semibold">Total Amount:</p>
              <p className="font-semibold">${order.total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-semibold">Status:</p>
              <p className="capitalize">{order.status}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};