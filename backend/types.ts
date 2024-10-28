export interface PurchaseOrder {
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