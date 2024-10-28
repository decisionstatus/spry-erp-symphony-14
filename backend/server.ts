import express from 'express';
import cors from 'cors';
import { purchaseOrderRoutes } from './routes/purchaseOrder';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/purchase-orders', purchaseOrderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});