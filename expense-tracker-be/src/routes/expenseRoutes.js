const express = require('express');
const router = express.Router();
const { getExpenses, getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

// GET /api/expenses - Get all expenses
router.get('/', getExpenses);

// POST /api/expenses - Create new expense
router.post('/', createExpense);

// GET /api/expenses/:id - Get single expense
router.get('/:id', getExpense);

// PUT /api/expenses/:id - Update expense
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', deleteExpense);

module.exports = router;
