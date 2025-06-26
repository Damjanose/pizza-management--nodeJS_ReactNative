import { Router } from 'express';
import { getAllIngredients, createIngredient } from '../controllers/ingredientController';
import { validateRole, requireRole } from '../middlewares/auth';

const router = Router();

// Apply role validation to all ingredient routes
router.use(validateRole);

// Both roles can view ingredients
router.get('/ingredients', requireRole(['waiter', 'cooker']), getAllIngredients);

// For testing/dev use only - no role restriction needed
router.post('/ingredients', createIngredient);

export { router as ingredientRoutes };