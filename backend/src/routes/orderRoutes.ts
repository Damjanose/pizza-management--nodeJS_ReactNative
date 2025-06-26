import { Router } from 'express';
import { 
  createOrder, 
  updateOrder, 
  getAllOrders, 
  confirmOrder, 
  markOrderReady 
} from '../controllers/orderController';
import { validateRole, requireRole } from '../middlewares/auth';

const router = Router();

// Apply role validation to all order routes
router.use(validateRole);

// Waiter can create and update orders, both roles can view
router.post('/orders', requireRole(['waiter']), createOrder);
router.put('/orders/:id', requireRole(['waiter']), updateOrder);
router.get('/orders', requireRole(['waiter', 'cooker']), getAllOrders);

// Only cooker can confirm or mark orders as ready
router.patch('/orders/:id/confirm', requireRole(['cooker']), confirmOrder);
router.patch('/orders/:id/ready', requireRole(['cooker']), markOrderReady);

export { router as orderRoutes };