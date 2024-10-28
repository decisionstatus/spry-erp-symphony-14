import express from 'express';
import { PurchaseOrder } from '../types';

const router = express.Router();

// In-memory storage for purchase orders
let purchaseOrders: PurchaseOrder[] = [];

// Get all purchase orders
router.get('/', (req, res) => {
  res.json(purchaseOrders);
});

// Get purchase order preview by ID
router.get('/:id/preview', (req, res) => {
  const order = purchaseOrders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Purchase order not found' });
  }
  res.json(order);
});

// Create new purchase order
router.post('/', (req, res) => {
  const newOrder: PurchaseOrder = {
    ...req.body,
    id: Date.now(),
    status: 'pending'
  };
  purchaseOrders.push(newOrder);
  res.status(201).json(newOrder);
});

export const purchaseOrderRoutes = router;