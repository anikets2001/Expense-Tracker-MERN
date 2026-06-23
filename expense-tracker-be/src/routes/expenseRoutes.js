import express from 'express';
import { getExpenses, getExpense, createExpense, updateExpense, deleteExpense, getExpenseStats } from '../controllers/expenseController.js';

const router = express.Router();

// GET /api/expenses - Get all expenses
router.get('/', getExpenses);

// GET /api/expenses/stats - Get expense statistics
router.get('/stats', getExpenseStats);

// POST /api/expenses - Create new expense
router.post('/', createExpense);

// GET /api/expenses/:id - Get single expense
router.get('/:id', getExpense);

// PUT /api/expenses/:id - Update expense
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', deleteExpense);

export default router;
